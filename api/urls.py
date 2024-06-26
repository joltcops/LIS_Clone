from django.urls import path, re_path, include
from django.contrib import admin

from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns=[
    path('', views.index, name='index'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.getRoutes),
    path('books/', views.getBooks),
    path('books/<int:pk>', views.getBook),
    path('books/latest', views.getlatestBooks),
    path('books/latest/one', views.getlatestBook),
    path('books/ISBN/<int:pk>', views.getBookISBN),
    path('books/<str:search>', views.getQuery),
    path('books/category/<int:pk>', views.getCategory),
    path('books/author/<str:search>', views.getAuthor),
    path('users/', views.getUsers),
    path('users/<int:pk>', views.getUser),
    path('users/code/<str:ucode>', views.getUserCode),
    path('users/login/<str:username>/<str:passwd>', views.login),
    path('adm/books/add', views.addBook),
    path('adm/books/delete/<int:pk>', views.deleteBook),
    path('adm/users/register', views.register),
    path('adm/users/edit_user/<int:pk>', views.edituser),
    path('adm/books/edit_book/<int:pk>', views.editbook),
    path('adm/users/delete/<int:pk>', views.deleteuser),
    path('adm/issue/<int:pk1>/<int:pk2>', views.issue),
    path('books/titavail/<str:search>', views.getTitAvailable),
    path('books/titreserve/<str:search>', views.getTitReserve),
    path('books/returnbook/<int:pk1>/<int:pk2>', views.returnbook),
    path('adm/gennotice/', views.cross),
    path('transactions/<int:pk>', views.getTransaction),
    path('transactions/<str:code>', views.getUserTransactions),
    path('transactions/book/<int:code>',views.getBookTransactions),
    path('transactions/', views.getAllTransactions),
    path('adm/genmaxbooks', views.getMaxBooks),
    path('adm/genISBN', views.genISBN),
    path('adm/genISBNsingle', views.genISBN),
    path('adm/return/<int:pk1>/<int:pk2>', views.returnbook),
    path('adm/reserve/<int:pk1>/<int:pk2>', views.reservebook),
    path('adm/latest_trans', views.getLatestTransaction),
    path('adm/custom_trans/<int:isbn>/<str:uid>/<int:cat>', views.customTrans),
    path('adm/procreq/<int:pk>/<str:tit>/<str:auth>/<str:link>', views.takeprocreq),
    path('adm/makereq', views.addReq),
    path('adm/reqs', views.getReqs),
    path('adm/suggest/<int:pk>', views.autosuggest),
    path('adm/MakeDB', views.makedb),
    path('procreq/<int:pk>', views.takeprocreq),
    path('notinshelf/<int:pk>/<int:isbn>', views.notinshelf),
]