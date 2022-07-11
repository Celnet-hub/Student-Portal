#this file is used to convert data the JSON API consumable format.

from rest_framework import serializers
from .models import Student
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
        #fields = ('first_name', 'last_name', 'email', 'phone', 'reg_no', 'address', 'current_level', 'createdAt')
        # Next is to create the API views


#create a token serializer class if username and password are provided
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

#RegisterSerializer is basically used to register a user in the database.
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    # #create a picklist field for the user to select a group to join from the list of Groups

    # # groups = serializers.PrimaryKeyRelatedField(
    # #     many=True,
    # #     queryset=User.groups.all()
    # # )
    # groups = serializers.ChoiceField(choices=(('student', 'Student'), ('course_lecturer', 'Course Lecturer'), ('hod', 'HOD'), ('exam_officer', 'Exam Officer'), ('admin', 'Admin'), ('dean', 'Dean'), ('level_adviser', 'Level Adviser')), required=True)


    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            #groups = validated_data['groups']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user