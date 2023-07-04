#this file is used to convert data into JSON API consumable format.

from unicodedata import name
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.fields import CurrentUserDefault

#create a serializer class
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        
        #fields = ('first_name', 'last_name', 'email', 'phone', 'reg_no', 'address', 'current_level', 'createdAt', 'student_faculty', 'student_department')
        # Next is to create the API views

#create a course serlizer class
class CourseSerializer(serializers.ModelSerializer):
    #create a field for the faculty name
    faculty = serializers.CharField(source='faculty.name')
    #create a field for the department name
    department = serializers.CharField(source='department.name')
    #create a field for the lecturer name
    lecturer = serializers.CharField(source='lecturer.first_name')
    class Meta:
        model = Course

        fields = '__all__'

# create a failed course serializer class
class FailedCourseSerializer(serializers.ModelSerializer):
    #create a field for the faculty name
    student = serializers.CharField(source='student.user')
    #create a field for the department name
    course = serializers.CharField(source='course.name')
    #create a field for the lecturer name
    lecturer = serializers.CharField(source='lecturer.first_name')
    #create a field for the credit unit
    credit_unit = serializers.CharField(source='course.credit_unit')
    #create a field for the reg_no
    reg_no = serializers.CharField(source='student.reg_no')
    class Meta:
        model = FailedCourse

        fields = '__all__'

# create a Course registration serializer class
class CourseRegistrationSerializer(serializers.ModelSerializer):
    #create a field student name for the student name
    student = serializers.SlugRelatedField(queryset=Student.objects.all(), slug_field='reg_no',)
    #create a field for the department name
    #course = serializers.CharField(source='course.name', read_only=True)
    course = serializers.SlugRelatedField(queryset=Course.objects.all(), slug_field='name')
    #create a field for the lecturer name
    lecturer = serializers.SlugRelatedField(queryset=Lecturer.objects.all(), slug_field='first_name')
    #create a field for the credit unit
    class Meta:
        model = CourseRegistration
        # read_only_fields = (
        #     'student',
        #     'course',
        #     'lecturer'
        # )
        fields = '__all__' 
    def create(self, validated_data):
        obj = CourseRegistration.objects.create(**validated_data)
        
        print(obj)
        return obj

# create a FailedCourseRegistration serializer class
class FailedCourseRegistrationSerializer(serializers.ModelSerializer):
    #create a field student name for the student name that is an instance of the Student model
    student = serializers.SlugRelatedField(queryset=Student.objects.all(), slug_field='reg_no',)
    #student = serializers.StringRelatedField()
    #create a field for the department name
    #course = serializers.CharField(source='course.name', read_only=True)
    course = serializers.SlugRelatedField(queryset=Course.objects.all(), slug_field='name')
    #create a field for the lecturer name
    #lecturer = serializers.CharField(source='lecturer.first_name', read_only=True)
    lecturer = serializers.SlugRelatedField(queryset=Lecturer.objects.all(), slug_field='first_name')
    #create a field for the credit unit
    class Meta:
        model = FailedCourseRegistration

        fields = '__all__' 

    def create(self, validated_data):
        obj = FailedCourseRegistration(**validated_data)
        obj.student = Student.objects.get(reg_no=validated_data['reg_no'])
        print(obj.student)
        obj.course = Course.objects.get(name=validated_data['course'])
        #get the lecturer object who is a foreign key in the FailedCourseRegistration model
        #obj.lecturer = Lecturer.objects.get(first_name=validated_data['lecturer'])
        obj.save()
        return obj


# create a serializer class for the student result
class StudentResultSerializer(serializers.ModelSerializer):
    #create a field for the student name
    student = serializers.SlugRelatedField(queryset=Student.objects.all(), slug_field='reg_no',)
    #create a field for the course name
    course = serializers.SlugRelatedField(queryset=Course.objects.all(), slug_field='name')
    #create a field for the lecturer name
    lecturer = serializers.SlugRelatedField(queryset=Lecturer.objects.all(), slug_field='first_name')
    course_code = serializers.CharField(source='course.code', )
    #create a field for the credit unit
    class Meta:
        model = StudentResult
        fields = '__all__' 
    def create(self, validated_data):
        obj = StudentResult.objects.create(**validated_data)
        obj.student = Student.objects.get(reg_no=validated_data['reg_no'])
        obj.course = Course.objects.get(name=validated_data['course'])
        obj.lecturer = Lecturer.objects.get(first_name=validated_data['lecturer'])
        obj.course_code = Course.objects.get(name=validated_data['code'])
        obj.save()
        return obj


#create a token serializer class if username and password are provided
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        #token['groups'] = user.groups
        token['is_staff'] = user.is_staff
        #token should return reg_no of the student who is logged in
        # get student object from the user object
        student = Student.objects.get(user=user)
        print(student.reg_no)
        token['reg_no'] = student.reg_no
        token['current_level'] = student.current_level
        token['email'] = student.email
        token['semester'] = student.current_semester
        print(student.current_semester)
        return token

#RegisterSerializer is basically used to register a user in the database.
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    # #create a picklist field for the user to select a group to join from the list of Groups

    # # groups = serializers.PrimaryKeyRelatedField(
    # #     many=True,
    # #     queryset=User.groups.all()
    # # )
    # groups = serializers.ChoiceField(choices=(('student', 'Student'), ('course_lecturer', 'Course Lecturer'), ('hod', 'HOD'), ('exam_officer', 'Exam Officer'), ('admin', 'Admin'), ('dean', 'Dean'), ('level_adviser', 'Level Adviser')), required=True)


    class Meta:
        model = User
        fields = ('username','first_name','last_name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user