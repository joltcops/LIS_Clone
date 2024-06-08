# Create your models here.
import uuid
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from django.contrib.auth.models import User as auth_user
from django.contrib.postgres.fields import ArrayField

import datetime

class Book(models.Model):

    ADVENTURE=1
    FANTASY=2
    CRIME=3
    CLASSICS=4
    HISTORY=5
    ROMANCE=6
    BIOGRAPHY=7
    MATHEMATICS=8
    COMPUTER_SCIENCE=9
    SCIENCE=10
    MECHANICS=11
    ELECTR=12
    PHYSICS=13
    CHEMISTRY=14
    CHEMICAL=15
    GEOLOGY=16
    OENA=17
    META=18
    BIOLOGY=19
    ARCH=20
    AGRI=21
    MINE=22
    CIVIL=23
    CATEGORIES=(
        (ADVENTURE, 'Adventure'),
        (FANTASY, 'Fantasy'),
        (CRIME, 'Crime'),
        (CLASSICS, 'Classics'),
        (HISTORY, 'History'),
        (ROMANCE, 'Romance'),
        (BIOGRAPHY, 'Biography'),
        (MATHEMATICS, 'Mathematics'),
        (COMPUTER_SCIENCE, 'Computer Science'),
        (SCIENCE, 'Science'),
        (MECHANICS, 'Mechanics'),
        (ELECTR, 'Electronics and Electrical Engineering'),
        (PHYSICS, 'Physics'),
        (CHEMISTRY, 'Chemistry'),
        (CHEMICAL, 'Chemical Engineering'),
        (GEOLOGY, 'Geology'),
        (OENA, 'Ocean and Naval Engineering'),
        (META, 'Metallurgy'),
        (BIOLOGY, 'Biotechnology and Biochemistry'),
        (ARCH, 'Architecture'),
        (AGRI, 'Agriculture and Farming'),
        (MINE, 'Mining'),
        (CIVIL, 'Civil Engineering'),
    )
    title=models.CharField(max_length=200)
    author=models.CharField(max_length=100)
    publisher=models.CharField(max_length=100)
    issued_code=models.CharField(default='0', max_length=9)
    reserved_code=models.CharField(default='0', max_length=9)
    description=models.CharField(default='0', max_length=1000)
    edition=models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(10000)])
    year=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(2101)])
    category=models.PositiveSmallIntegerField(choices=CATEGORIES, blank=True, null=True, default=0)
    last_issue_date=models.DateField(default=datetime.date.today())
    available=models.BooleanField(default=1)
    reserved=models.BooleanField(default=0)
    max_reserve_date=models.DateField(default=datetime.date.today())
    cupboard=models.IntegerField(default=0, validators=[MinValueValidator(0)])
    rack=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(4)])
    position=models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])
    ISBN=models.IntegerField(default=0)
    def __str__(self):
        return self.title
    
class Transaction(models.Model):
    ISSUE=1
    RETURN=2
    RESERVE=3
    KINDS=(
        (ISSUE, 'Issue Book'),
        (RETURN, 'Return Book'),
        (RESERVE, 'Reserve Book'),
    )
    category=models.PositiveSmallIntegerField(choices=KINDS, blank=True, null=True, default=0)
    max_date_of_reserve=models.DateField(default=date.today()+relativedelta(years=5))
    issue_date=models.DateField(default=date.today()+relativedelta(years=5))
    due_date=models.DateField(default=date.today()+relativedelta(years=5))
    return_date=models.DateField(default=date.today()+relativedelta(years=5))
    dues=models.IntegerField(default=0, validators=[MinValueValidator(0)])
    user_code=models.CharField(max_length=9, default='0')
    book_id=models.IntegerField(default=0)
    active=models.BooleanField(default=0)
    def __str__(self):
        if self.category==1:
            return 'Issue Book'
        elif self.category==2:
            return 'Return Book'
        elif self.category==3:
            return 'Reserve Book'

class Req(models.Model):
    PROCURE=1
    NOT_FOUND=2
    REQUESTS=(
        (PROCURE, 'Procure a non-existent book'),
        (NOT_FOUND, 'Register complaint for a book not in shelf'),
    )
    request=models.PositiveSmallIntegerField(choices=REQUESTS, blank=True, null=True, default=0)
    ucode=models.CharField(max_length=9)
    bISBN=models.IntegerField(default=0)
    bname=models.CharField(max_length=200, default="")
    bauthor=models.CharField(max_length=100, default="")
    blink=models.CharField(max_length=10000, default="")
    def __str__(self):
        return self.bname
    
class User(models.Model):

    UG=1
    PG=2
    RS=3
    FACULTY=4
    ADMIN=5
    TYPES=(
        (UG, 'Undergraduate Student'),
        (PG, 'Postgraduate Student'),
        (RS, 'Research Scholar'),
        (FACULTY, 'Faculty Member'),
        (ADMIN, 'Administrator'),
    )
    username=models.CharField(max_length=20)
    users = models.ForeignKey(auth_user, on_delete=models.CASCADE, related_name='users', blank=True, null=True)
    name=models.CharField(max_length=100)
    code=models.CharField(max_length=9)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=12)
    notification=models.CharField(max_length=1000)
    dept=models.CharField(max_length=2, default='0')
    type=models.PositiveSmallIntegerField(choices=TYPES, blank=True, null=True, default=0)
    max_books=models.IntegerField(default=0, validators=[MinValueValidator(2), MaxValueValidator(10)])
    active_no=models.IntegerField(default=0)#, validators=[MinValueValidator(0), MaxValueValidator(max_books)])
    reserve_no=models.IntegerField(default=0)#, validators=[MinValueValidator(0), MaxValueValidator(max_books)])
    count=models.IntegerField(default=0)
    #cat=ArrayField(models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(23)]), blank=True, default=list)
    active_books=models.ManyToManyField(Book, blank=True, null=True, related_name='active_books')
    reserved_books=models.ManyToManyField(Book, blank=True, null=True, related_name='reserved_books')
    transactions=models.ManyToManyField(Transaction, blank=True, null=True, related_name='transactions')
    fine=models.IntegerField(default=0, validators=[MinValueValidator(0)])
    valid_till=models.DateField(default=datetime.date.today())
    class Meta():
        if type==1:
            max_books=2
        if type==2:
            max_books=4
        if type==3:
            max_books=6
        if type==4:
            max_books=10
    def __str__(self):
        return self.name
