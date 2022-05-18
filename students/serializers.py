#this file is used to convert data the JSON API consumable format.

from rest_framework import serializers
from .models import Student

#create a serializer class
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        #fields = ('first_name', 'last_name', 'email', 'phone', 'reg_no', 'address', 'current_level', 'createdAt')
        # Next is to create the API views