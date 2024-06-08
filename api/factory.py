import factory
from django.contrib.auth.models import User
from .models import Book
from faker import Faker
import random

# Create an instance of Faker
faker = Faker()

class BookFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Book
    
    title = factory.Faker('sentence', nb_words=3)
    author = factory.Faker('name')
    publisher = factory.Faker('company')
    category=factory.Faker('random_int', min=1, max=23)
    edition=factory.Faker('random_int', min=1, max=10)
    year=factory.Faker('random_int', min=1950, max=2023)
    description=factory.Faker('sentence', nb_words=15)
