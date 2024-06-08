from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book
from .serializers import BookSerializer
from .models import User
from .models import Transaction
from .serializers import TransactionSerializer
from .serializers import UserSerializer
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from rest_framework.views import APIView
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User as auth_user
from .models import Req
from .serializers import ReqSerializer
from collections import Counter

# Create your views here.
#For user authentication
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/token',
        '/token/refresh',
    ]
    return Response(routes)

#Get all books
@api_view(['GET'])
def getBooks(request):
    books=Book.objects.all()
    bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Get last 10 added books
@api_view(['GET'])
def getlatestBooks(request):
    last_ten=Book.objects.all().order_by('-id')[:10]
    bookSerializer=BookSerializer(last_ten, many=True)
    return Response(bookSerializer.data)

#Get last added book
@api_view(['GET'])
def getlatestBook(request):
    last = Book.objects.all().latest('id')
    bookSerializer=BookSerializer(last, many=False)
    return Response(bookSerializer.data)

#Get book by primary key search
@api_view(['GET'])
def getBook(request, pk):
    book = Book.objects.get(id = pk)
    bookSerializer = BookSerializer(book, many=False)
    return Response(bookSerializer.data)

#Get book by entered ISBN
@api_view(['GET'])
def getBookISBN(request, pk):
    book = Book.objects.get(ISBN = pk)
    bookSerializer = BookSerializer(book, many=False)
    return Response(bookSerializer.data)

#Get book by searched title substring
@api_view(['GET'])
def getQuery(request, search):
    # print(search)
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Get available book by title substring
@api_view(['GET'])
def getTitAvailable(request, search):
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search, available=True, reserved=False)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Get reserved book by title substring
@api_view(['GET'])
def getTitReserve(request, search):
    books=Book.objects.all()
    if search is not None:
        books=books.filter(title__icontains=search, available=False, reserved=True)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Get book by searched category
@api_view(['GET'])
def getCategory(request, pk):
    # book = Book.objects.get(category = pk)
    # bookSerializer = BookSerializer(book, many=False)
    # return Response(bookSerializer.data)
    books=Book.objects.all()
    if pk is not None:
        books=books.filter(category=pk)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Search book by author name
@api_view(['GET'])
def getAuthor(request, search):
    # print(search)
    books=Book.objects.all()
    if search is not None:
        books=books.filter(author__icontains=search)
        bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

#Get all the users registered in the system
@api_view(['GET'])
def getUsers(request):
    users=User.objects.all()
    userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)

#Get all the requests made so far
@api_view(['GET'])
def getReqs(request):
    reqs=Req.objects.all()
    reqSerializer=ReqSerializer(reqs, many=True)
    return Response(reqSerializer.data)

#Get user by primary key
@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id = pk)
    userSerializer = UserSerializer(user, many=False)
    return Response(userSerializer.data)

#Get user by user code
@api_view(['GET'])
def getUserCode(request, ucode):
    users = User.objects.all()
    if ucode is not None:
        users=users.filter(code__icontains=ucode)
        userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)

#User login
@api_view(['GET'])
def login(request, username, passwd):
    users=User.objects.all()
    if username is not None:
        users=users.filter(username=username)
        if passwd is not None:
            users=users.filter(password=passwd)
            userSerializer=UserSerializer(users, many=True)
    return Response(userSerializer.data)

#Add a book to the library
@api_view(['POST'])
def addBook(request):
    data=request.data
    bookSerializer=BookSerializer(data=data)
    if bookSerializer.is_valid():       
        bookSerializer.save()
    return Response(bookSerializer.data)

#Get a request
@api_view(['POST'])
def addReq(request):
    data=request.data
    reqSerializer=ReqSerializer(data=data)
    if reqSerializer.is_valid():
        reqSerializer.save()
    return Response(reqSerializer.data)

#Generate ISBN of all books
@api_view(['GET', 'POST'])
def genISBN(request):    
    books=Book.objects.all()
    for book in books:
        position=book.id%10
        rack=(book.id//10)%5
        cupboard=book.id//50
        isbn=cupboard*100+rack*10+position
        book.ISBN=isbn
        book.cupboard=cupboard
        book.rack = rack
        book.position=position
        book.save()
    bookSerializer=BookSerializer(books, many=True)
    return Response(bookSerializer.data)

# @api_view(['GET', 'POST'])
# def genISBNsingle(request):
    
#     book=Book.objects.all().latest('id')
   
#     position=book.id%10
#     rack=(book.id//10)%5
#     cupboard=book.id//50
#     isbn=cupboard*100+rack*10+position
#     book.ISBN=isbn
#     book.cupboard=cupboard
#     book.rack = rack
#     book.position=position
#     book.save()
#     latest_book=Book.objects.get(id=book.id)
#     bookSerializer=BookSerializer(latest_book, many=False)
#     return Response(bookSerializer.data)

#Allot ISBN to the last added book
@api_view(['GET', 'POST'])
def genISBNsingle(request):
    try:
        book = Book.objects.all().latest('id')
        position = book.id % 10
        rack = (book.id // 10) % 5
        cupboard = book.id // 50
        isbn = cupboard * 100 + rack * 10 + position
        book.ISBN = isbn
        book.cupboard = cupboard
        book.rack = rack
        book.position = position
        book.save()
        book_serializer = BookSerializer(book, many=False)
        return Response({"mydata": book_serializer.data, "message": "ISBN generated successfully"})
    except Book.DoesNotExist:
        return Response({'error': 'No books found'}, status=404)

#Delete a book from the library
@api_view(['DELETE'])
def deleteBook(request, pk):
    book=Book.objects.get(id=pk)
    if (book.available==False or book.reserved==True):
        return Response('Book is not available to delete')
    book.delete()
    return Response('Book was deleted')

#Register a new user into the system
@api_view(['GET', 'POST'])
def register(request):
    data = request.data
    user_serializer = UserSerializer(data=data)
    if user_serializer.is_valid():
        # Create a new user
        auth_user.objects.create_user(
            username=data['code'],
            email=data['email'],
            password=data['password']  # You may want to hash the password properly
        )

        # Save the user details provided during registration
        user_serializer.save()

        return Response(user_serializer.data)
    else:
        return Response(user_serializer.errors)

#Allot the maximum number of books for a new user
@api_view(['GET','POST'])
def getMaxBooks(request):
    
    user=User.objects.latest("id")
    if user.type == 1:
        user.max_books = 2
    if user.type == 2:
        user.max_books = 4
    if user.type == 3:
        user.max_books = 6
    if user.type == 4:
        user.max_books = 10
    user.save()
    return Response(user.max_books)

#Edit the details of a user
@api_view(['POST'])
def edituser(request, pk):
    data=request.data
    user=User.objects.get(id=pk)
    userSerializer=UserSerializer(instance=user, data=data)
    if userSerializer.is_valid():
        userSerializer.save()
    return Response(userSerializer.data)

#Edit the details of a book
@api_view(['POST'])
def editbook(request, pk):
    data=request.data
    book=Book.objects.get(id=pk)
    bookSerializer=BookSerializer(instance=book, data=data)
    if bookSerializer.is_valid():
        bookSerializer.save()
    return Response(bookSerializer.data)

#Delete a user
@api_view(['DELETE'])
def deleteuser(request, pk):
    user=User.objects.get(id=pk)
    u = auth_user.objects.get(username=user.code)
    u.delete()
    user.delete()
    return Response('User was deleted')

#Issue the entered book to the required user
@api_view(['GET','POST'])
def issue(request, pk1, pk2):
    book=Book.objects.get(id=pk1)
    user=User.objects.get(id=pk2)
    if (book.available==True):
        if (book.reserved==False):
            if (user.active_no+user.reserve_no<user.max_books):
                user.active_no=user.active_no+1
                book.available=False
                book.issued_code=user.code
                user.active_books.add(book)
                user.save()
                book.save()
                issue_dates=date.today()
                if user.type==1:
                    MONTHS=1
                elif user.type==2:
                    MONTHS=1
                elif user.type==3:
                    MONTHS=3
                elif user.type==4:
                    MONTHS=6
                due_dates=issue_dates+relativedelta(months=MONTHS)
                trans=Transaction(category=1, issue_date=issue_dates, due_date=due_dates, user_code=user.code, book_id=book.ISBN, active=True)
                transSerializer=TransactionSerializer(trans, many=False)
                trans.save()
                user.transactions.add(trans)
                user.save()
                return Response(transSerializer.data)
    if (book.available==True):
        if(book.reserved==True):
            if (user.reserved_books.contains(book)):
                if(date.today()<=book.max_reserve_date):
                    user.active_no=user.active_no+1
                    user.reserve_no=user.reserve_no-1
                    book.reserved=False
                    book.available=False
                    book.issued_code=user.code
                    book.reserved_code='0'
                    user.reserved_books.remove(book)
                    user.active_books.add(book)
                    issue_dates=date.today()
                    if user.type==1:
                        MONTHS=1
                    elif user.type==2:
                        MONTHS=1
                    elif user.type==3:
                        MONTHS=3
                    elif user.type==4:
                        MONTHS=6
                    due_dates=issue_dates+relativedelta(months=MONTHS)
                    trans=Transaction(category=1, issue_date=issue_dates, due_date=due_dates, user_code=user.code, book_id=book.ISBN, active=True)
                    transSerializer=TransactionSerializer(trans, many=False)
                    trans.save()
                    user.transactions.add(trans)
                    user.save()
                    book.save()
                    return Response(transSerializer.data)
    return Response(book.available)

#Get transaction by primary key
@api_view(['GET'])
def getTransaction(request, pk):
    transact=Transaction.objects.get(id=pk)
    transactSerializer=TransactionSerializer(transact, many=False)
    return Response(transactSerializer.data)

#Crossed the due date and didnt return book yet
@api_view(['GET', 'POST'])
def cross(request):
    current_date=date.today()
    trans=Transaction.objects.filter(due_date__lt=current_date, category = 1, active=True)
    all_users=User.objects.all()
    for users in all_users:
        for transact in trans:
            if (users.code==transact.user_code):
                users.fine=(current_date-transact.due_date).days*20
                transact.dues=users.fine
                users.notification='You have pending books to return!! The book ISBN is: {}, Present fine is: {}'.format(transact.book_id, users.fine)
                transact.save()
                users.save()
    trans=Transaction.objects.filter(category=3, max_date_of_reserve__lt=current_date)
    for transact in trans:
        book_entered=Book.objects.get(ISBN=transact.book_id)
        book_entered.reserved=False
        book_entered.available=True
        book_entered.save()
    for users in all_users:
        for transact in trans:
            if (users.code==transact.user_code):
                users.notification='The book {} is no longer reserved for you!!'.format(transact.book_id)
                book_ent=Book.objects.get(ISBN=transact.book_id)
                users.reserved_books.remove(book_ent)
                book_ent.max_reserve_date=date.today()+relativedelta(years=5)
                users.save()
                users.reserve_no=users.reserved_books.count()
                users.save()
                book_ent.issued_code='0'
                book_ent.save()
    transactfilter = Transaction.objects.filter(dues__gt=0, category = 1, active=True)
    transactSerializer = TransactionSerializer(transactfilter, many=True)
    return Response(transactSerializer.data)

#Return a book from an entered user
@api_view(['GET', 'POST'])
def returnbook(request, pk1, pk2):
    try:
        book_entered = Book.objects.get(id=pk1)
        user_entered = User.objects.get(id=pk2)
        if not book_entered.available:
            if book_entered in user_entered.active_books.all():  # Checking if the book is in active_books
                user_entered.active_no -= 1
                user_entered.notification = "Step into a world where imagination knows no bounds and stories come to life. Whether you're seeking adventures in distant lands, unraveling mysteries, or simply seeking solace in the pages of a good book, you've found your sanctuary here. Take a deep breath, let the scent of knowledge envelop you, and embark on your literary journey. Welcome, adventurer!"
                user_entered.active_books.remove(book_entered)
                book_entered.available = True
                book_entered.issued_code = '0'
                book_entered.save()  # Saving book changes
                user_entered.save()  # Saving user changes
                return_date = date.today()
                print(user_entered.transactions.all())
                transissue = user_entered.transactions.filter(book_id=book_entered.ISBN, category=1, active=True).latest('id')
                transissue.dues = 0
                user_entered.fine = 0
                due_amt = (return_date - transissue.due_date).days * 20
                if due_amt < 0:
                    due_amt = 0
                transret = Transaction(category=2, return_date=return_date, dues=due_amt, user_code=user_entered.code, book_id=book_entered.ISBN, issue_date=transissue.issue_date)
                transret.save()
                transissue.active=False
                transissue.save()
                user_entered.transactions.add(transret)
                user_entered.save()
                if book_entered.reserved:
                    book_entered.available = True
                    max_date = return_date + relativedelta(days=7)
                    transres = Transaction.objects.filter(category=3, book_id=book_entered.ISBN).latest('id')
                    transres.max_date_of_reserve = max_date
                    book_entered.max_reserve_date=max_date
                    book_entered.save()
                    transres.save()
                return Response(book_entered.available)
            else:
                return Response("Book is not issued to this user!")
        else:
            return Response("Book is already available!")
    except Book.DoesNotExist:
        return Response("Book does not exist!")
    except User.DoesNotExist:
        return Response("User does not exist!")

#Reserve an entered book for a user
@api_view(['GET', 'POST'])
def reservebook(request, pk1, pk2):
    book_entered=Book.objects.get(id=pk1)
    user_entered=User.objects.get(id=pk2)
    if (book_entered.available==False):
        if (book_entered.reserved==False):
            if (user_entered.active_no+user_entered.reserve_no<user_entered.max_books and user_entered.code!=book_entered.issued_code):
                user_entered.reserved_books.add(book_entered)
                user_entered.save()
                user_entered.reserve_no=user_entered.reserved_books.count()
                book_entered.available=False
                book_entered.reserved=True
                book_entered.reserved_code=user_entered.code
                transact=Transaction(category=3, user_code=user_entered.code, book_id=book_entered.ISBN, issue_date=date.today(), max_date_of_reserve=user_entered.valid_till)
                transact.save()
                user_entered.transactions.add(transact)
                book_entered.save()
                user_entered.save()
    return Response(book_entered.available)

#Get the latest transaction done
@api_view(['GET'])
def getLatestTransaction(request):
    transaction = Transaction.objects.latest('id')
    transacSerializer = TransactionSerializer(transaction, many=False)
    return Response(transacSerializer.data)

#Get transaction filtered by isbn, user code, and transaction category
@api_view(['GET'])
def customTrans(request, isbn, uid, cat):
    trans=Transaction.objects.filter(book_id=isbn, user_code=uid, category=cat).latest('id')
    transSerializer = TransactionSerializer(trans, many=False)
    return Response(transSerializer.data)

#Get the transactions made by the entered user
@api_view(['GET'])
def getUserTransactions(request, code):
    trans = Transaction.objects.all().filter(user_code=code).order_by('-id')
    transSerializer = TransactionSerializer(trans, many=True)
    return Response(transSerializer.data)

#Get the transactions related to a given book
@api_view(['GET'])
def getBookTransactions(request, code):
    trans = Transaction.objects.all().filter(book_id=code).order_by('-id')
    transSerializer = TransactionSerializer(trans, many=True)
    return Response(transSerializer.data)

#Get all transactions made so far
@api_view(['GET'])
def getAllTransactions(request):
    trans = Transaction.objects.all().order_by('-id')
    transSerializer = TransactionSerializer(trans, many=True)
    return Response(transSerializer.data)

#Take in request to procure a book not currently in the library
@api_view(['GET', 'POST'])
def takeprocreq(request, pk, tit, auth, link):
    require=Req(ucode=User.objects.get(id=pk).code, bname=tit, bauthor=auth, blink=link, request=1)
    require.save()
    return Response(require.bname)

#Take in request to report a book not in its position in the bookshelf
@api_view(['GET', 'POST'])
def notinshelf(request, pk, isbn):
    require=Req(ucode=User.objects.get(id=pk).code, bISBN=isbn, bname=Book.objects.get(ISBN=isbn).title, bauthor=Book.objects.get(ISBN=isbn).author, request=2)
    require.save()
    return Response(require.ucode)

#Create a database of books(Not in use currently, was in the previous build, database now generated by the faker)
@api_view(['GET', 'POST'])
def makedb(request):
    all_book=Book.objects.all()
    for books in all_book:
        books.delete()
    for i in range( 0, 10 ):
        c=Book(title=' Switching and Finite Automata Theory ', author='Zvi Kohavi', publisher='Cambridge', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Let us C ', author='Byron Gottfried', publisher='Tata McGraw-Hill', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Automata and Computability ', author='Dexter Kozen', publisher='Springer', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Software Engineering at Google ', author='Titus, Manshreck and Wright', publisher='O Reilly', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' An Introduction to GCC ', author='Brian Gough', publisher='Network Theory Ltd.', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Algorithm Design ', author='Kleinberg and Tardos', publisher='Pearson', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Compilers - Principles, Techniques and Tools ', author='Aho, Sethi and Ullman', publisher='Addison-Wesley', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Machine Learning ', author='Tom Mitchell', publisher='McGraw Hill', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Operating Systems Concepts ', author='A. Silverschatz, Galvin and Gagne', publisher='Wiley', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Mastering Blockchain ', author='Imran Bashir', publisher='Packt Publishing', available=True, reserved=False, category=9)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Strength of Materials ', author='R.K. Bansal', publisher='Laxmi Publications', available=True, reserved=False, category=23)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Surveying: Theory and Practice ', author='B.C. Punmia', publisher='Laxmi Publications', available=True, reserved=False, category=23)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Fluid Mechanics ', author='Cengel and Cimbala', publisher='McGraw-Hill', available=True, reserved=False, category=23)
        c.save()
    for i in range( 0, 10 ):
        c=Book(title=' Design of Reinforced Concrete Structures ', author='N. Subramanian', publisher='Oxford University Press', available=True, reserved=False, category=23)
        c.save()
    books1=Book.objects.all()
    bookSerializer=BookSerializer(books1, many=True)
    return Response(bookSerializer.data)

#Simple algorithm to autosuggest recommended books for a user
@api_view(['GET', 'POST'])
def autosuggest(request, pk):
    users=User.objects.get(id=pk)
    department=users.dept
    if (users.count<5):
        if department=='CS':
            reln=9
        elif department=='EE':
            reln=12
        elif department=='MA':
            reln=8
        elif department=='EC':
            reln=12
        elif department=='ME':
            reln=11
        elif department=='CH':
            reln=15
        elif department=='CE':
            reln=23
        elif department=='CY':
            reln=14
        elif department=='PH':
            reln=13
        elif department=='EX':
            reln=16
        elif department=='GG':
            reln=16
        elif department=='NA':
            reln=17
        elif department=='MT':
            reln=18
        elif department=='BS':
            reln=19
        elif department=='AR':
            reln=20
        elif department=='AG':
            reln=21
        elif department=='MI':
            reln=22
        books=Book.objects.filter(category=reln, available=True, reserved=False)
    # else :
    #     category_counter = Counter(users.cat)
    #     most_common_category, frequency = category_counter.most_common(1)[0]
    #     books=Book.objects.filter(category=most_common_category, available=True, reserved=False)
    names = []
    mybook = []
    for book1 in books:
        if ((book1.title in names)==False):
            names.append(book1.title)
            mybook.append(book1)
    i = min(8, len(mybook))
    mybook = mybook[:i]
    bookSerializer=BookSerializer(mybook, many=True)
    return Response(bookSerializer.data)