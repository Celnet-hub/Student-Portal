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
    student_faculty = models.ForeignKey('Faculty', on_delete=models.SET_NULL, blank=True, null=True)
    student_department = models.ForeignKey('Department', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

# Create Courses Models
class Course(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)
    lecturer = models.ForeignKey('Lecturer', on_delete=models.SET_NULL, null=True, blank=True)
    level = models.IntegerField(blank=False, null=False)
    semester = models.IntegerField(blank=False, null=False)
    credit_unit = models.IntegerField(blank=False, null=False)
    deparment = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)
    faculty = models.ForeignKey('Faculty', on_delete=models.SET_NULL, null=True, blank=True)
    courseType = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Create Lecturers Models
class Lecturer(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)
    lecturer_department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True, blank=True)
    lecturer_faculty = models.ForeignKey('Faculty', on_delete=models.SET_NULL, null=True, blank=True)
    rank_title = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name + " " + self.last_name

# Create Departments Models
class Department(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)
    faculty = models.ForeignKey('Faculty', on_delete=models.SET_NULL, null=True, blank=True)
    HOD = models.ForeignKey('Lecturer', on_delete=models.SET_NULL, null=True, blank=True)
    no_of_courses = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return self.name

# Create Faculties Models
class Faculty(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)
    no_of_departments = models.IntegerField(blank=False, null=False)
    dean = models.ForeignKey('Lecturer', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

# Create Failed Courses Models
class FailedCourse(models.Model):
    student = models.ForeignKey('Student', on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey('Course', on_delete=models.SET_NULL, null=True, blank=True)
    courseType = models.CharField(max_length=255)
    semester = models.IntegerField(blank=False, null=False)
    year = models.IntegerField(blank=False, null=False)
    createdAt = models.DateTimeField("cCreated At", auto_now_add=True)

    def __str__(self):
        return self.student.first_name + " " + self.student.last_name + " " + self.course.name