#this file is used to convert data into JSON API consumable format.

from unicodedata import name
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        # ...
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