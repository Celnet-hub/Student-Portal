from django.db import models

# Create student's models here.

class Student(models.Model):
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    reg_no = models.TextField(blank=False, null=False)
    address = models.TextField(blank=True, null=True)
    current_level = models.IntegerField(blank=False, null=False)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)

    def __str__(self):
        return self.first_name
