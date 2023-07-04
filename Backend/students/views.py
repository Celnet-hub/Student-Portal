#from django.shortcuts import render

# Create views here.
from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger 
from .models import *
from .serializers import StudentSerializer,MyTokenObtainPairSerializer, RegisterSerializer, CourseSerializer, FailedCourseSerializer, CourseRegistrationSerializer, FailedCourseRegistrationSerializer, StudentResultSerializer

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
            '/api/token/refresh/',
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


# create a view to allow authenticated users retrive courses if user is student and 400 level
class CourseView(generics.ListAPIView):
    serializer_class = CourseSerializer
    print(serializer_class)
    permission_classes =  (AllowAny,)
    def get_queryset(self):
        if not self.request.user.is_staff:
            curent_user_StdModel = self.request.user.student.first()
            current_level =  curent_user_StdModel._meta.get_field('current_level').value_from_object(curent_user_StdModel)
            print(curent_user_StdModel.get_current_level_display())
            print(current_level)
            current_semester =  curent_user_StdModel._meta.get_field('current_semester').value_from_object(curent_user_StdModel)

            # get current user reg_no
            reg_no = self.request.user.student.first().reg_no
            print('This is from course view: ', reg_no)

            if current_level == 500:
                #return a list of courses and reg_no
                return Course.objects.filter(level=current_level, semester=current_semester)
            elif current_level == 400:
                return Course.objects.filter(level=current_level, semester=current_semester)
            elif current_level == 300:
                return Course.objects.filter(level=current_level, semester=current_semester)
            elif current_level == 200:
                return Course.objects.filter(level=current_level, semester=current_semester)
            elif current_level == 100:
                return Course.objects.filter(level=current_level, semester=current_semester)
        else:
            return Course.objects.all()
        return reg_no


# create a view to allow authenticated users to retrive failed courses if user is a student
class FailedCourseView(generics.ListAPIView):
    serializer_class = FailedCourseSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        if not self.request.user.is_staff:
            curent_user_StdModel = self.request.user.student.first()
            current_level =  curent_user_StdModel._meta.get_field('current_level').value_from_object(curent_user_StdModel)
            student_regNo =  curent_user_StdModel._meta.get_field('reg_no').value_from_object(curent_user_StdModel)
            print(curent_user_StdModel.get_current_level_display())
            print(student_regNo)
            current_semester =  curent_user_StdModel._meta.get_field('current_semester').value_from_object(curent_user_StdModel)

            if current_level == 500:
                #check failed courses for student name and return them
                return FailedCourse.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 400:
                return FailedCourse.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 300:
                return FailedCourse.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 200:
                return FailedCourse.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 100:
                return FailedCourse.objects.filter(reg_no=student_regNo, semester=current_semester)
            else:
                return FailedCourse.objects.all()


# create a view to allow authenticated users to post registered 
class RegisteredCourseView(viewsets.ModelViewSet):
    serializer_class =  CourseRegistrationSerializer
    permission_classes = (IsAuthenticated,)
    #queryset =   CourseRegistration.objects.all()

    #print(queryset)

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def get_queryset(self):
        print(self.request.user.student.first().reg_no)
        #check course registration status for student and reg_no in course registration table

        if self.request.user.student.first().registration_status == 'NR':
            current_level = self.request.user.student.first().current_level
            current_semester = self.request.user.student.first().current_semester
            reg_no = self.request.user.student.first().reg_no
            return CourseRegistration.objects.filter(semester=current_semester, year=current_level, status= 'P')
        return super().get_queryset().filter(reg_no=self.request.user.student.first().reg_no, semester=self.request.user.student.first().current_semester, year=self.request.user.student.first().current_level, status= 'Reg')
        


# create a view to allow authenticated users to post failed registered courses
class FailedCourseRegistrationView(viewsets.ModelViewSet):
    serializer_class =  FailedCourseRegistrationSerializer
    permission_classes = (IsAuthenticated,)
    queryset =   FailedCourseRegistration.objects.all() 

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    def get_queryset(self):
        if self.request.user.student.first().has_registered_failed_course:
            current_level = self.request.user.student.first().current_level
            current_semester = self.request.user.student.first().current_semester
            reg_no = self.request.user.student.first().reg_no
            return FailedCourseRegistration.objects.filter(semester=current_semester, status= 'Reg', reg_no=reg_no)
        return FailedCourseRegistration.objects.filter(reg_no=self.request.user.student.first().reg_no, semester=self.request.user.student.first().current_semester, status= 'P')

#create a view to allow authenticated users view results
class ResultView(viewsets.ModelViewSet):
    serializer_class = StudentResultSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        if not self.request.user.is_staff:
            curent_user_StdModel = self.request.user.student.first()
            current_level =  curent_user_StdModel._meta.get_field('current_level').value_from_object(curent_user_StdModel)
            student_regNo =  curent_user_StdModel._meta.get_field('reg_no').value_from_object(curent_user_StdModel)
            current_semester =  curent_user_StdModel._meta.get_field('current_semester').value_from_object(curent_user_StdModel)

            if current_level == 500:
                #check failed courses for student name and return them
                return StudentResult.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 400:
                return StudentResult.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 300:
                return StudentResult.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 200:
                return StudentResult.objects.filter(reg_no=student_regNo, semester=current_semester,)
            elif current_level == 100:
                return StudentResult.objects.filter(reg_no=student_regNo, semester=current_semester)
        else:
            return StudentResult.objects.all()

#create a view to allow authenticated users view approved coureses
class ApprovedCourseView(viewsets.ModelViewSet):
    serializer_class = CourseRegistrationSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        if not self.request.user.is_staff:
            curent_user_StdModel = self.request.user.student.first()
            current_level =  curent_user_StdModel._meta.get_field('current_level').value_from_object(curent_user_StdModel)
            student_regNo =  curent_user_StdModel._meta.get_field('reg_no').value_from_object(curent_user_StdModel)
            current_semester =  curent_user_StdModel._meta.get_field('current_semester').value_from_object(curent_user_StdModel)

            if current_level == 500:
                #check failed courses for student name and return them
                return CourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester, status = 'A')
            elif current_level == 400:
                return CourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 300:
                return CourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 200:
                return CourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 100:
                return CourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester, status = 'A')
        else:
            return CourseRegistration.objects.all()

class ApprovedFailedCoursesView(viewsets.ModelViewSet):
    serializer_class = FailedCourseRegistrationSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        if not self.request.user.is_staff:
            curent_user_StdModel = self.request.user.student.first()
            current_level =  curent_user_StdModel._meta.get_field('current_level').value_from_object(curent_user_StdModel)
            student_regNo =  curent_user_StdModel._meta.get_field('reg_no').value_from_object(curent_user_StdModel)
            current_semester =  curent_user_StdModel._meta.get_field('current_semester').value_from_object(curent_user_StdModel)

            if current_level == 500:
                #check failed courses for student name and return them
                return FailedCourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester, status = 'A')
            elif current_level == 400:
                return FailedCourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 300:
                return FailedCourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 200:
                return FailedCourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester,status = 'A')
            elif current_level == 100:
                return FailedCourseRegistration.objects.filter(reg_no=student_regNo, semester=current_semester, status = 'A')
        else:
            return FailedCourseRegistration.objects.all()