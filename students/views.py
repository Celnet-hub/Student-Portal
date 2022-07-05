#from django.shortcuts import render

# Create views here.
from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger 
from .models import Student
from .serializers import StudentSerializer,MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics

from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

def front(request):
    context = { }
    return render(request, "index.html", context)

#configure view for process POST and GET requests
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def student_list(request):
   
    #get all students
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        students = Student.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(students, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = StudentSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/students/?page=' + str(nextPage), 'prevlink': '/api/students/?page=' + str(previousPage)})

    #create a new student
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""@api_view(['GET', 'PUT', 'DELETE']) for a signle student"""

#decorator to process GET, PUT and DELETE requests
@api_view(['GET', 'PUT', 'DELETE'])
def student_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    #get a single student
    if request.method == 'GET':
        serializer = StudentSerializer(student,context={'request': request})
        return Response(serializer.data)

    #update a student
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #delete a student
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Next: studentportal/students/urls.py

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoutes(request):
    if request.method == 'GET':
        routes = [
            '/api/token/',
            '/api/register/',
            '/api/token/refresh/'
        ]
        return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

#create a class based view
# Add this CBV
class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
