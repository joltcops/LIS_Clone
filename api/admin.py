from django.contrib import admin

# Register your models here.
from .models import Book
from .models import User
from .models import Transaction
from .models import Req

admin.site.register(Book)
admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(Req)