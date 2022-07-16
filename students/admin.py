from django.contrib import admin
from .models import Student, Course, Lecturer, Department, Faculty, FailedCourse

class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'address', 'createdAt', 'current_level', 'reg_no', 'student_faculty', 'student_department')
    list_filter = ('student_department',)
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'address', 'createdAt', 'current_level', 'reg_no', 'student_faculty', 'student_department')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'description', 'createdAt', 'lecturer', 'level', 'semester', 'credit_unit', 'department', 'faculty')
    list_filter = ('department',)
    search_fields = ('name', 'code', 'description', 'createdAt', 'lecturer', 'level', 'semester', 'credit_unit', 'department', 'faculty')

class LecturerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'address', 'createdAt', 'lecturer_department', 'lecturer_faculty', 'rank_title')
    list_filter = ('lecturer_department',)
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'address', 'createdAt', 'lecturer_department', 'lecturer_faculty', 'rank_title')

# class DepartmentAdmin(admin.ModelAdmin):
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'description', 'createdAt', 'faculty', 'HOD', 'no_of_courses')
    list_filter = ('faculty',)
    search_fields = ('name', 'code', 'description', 'createdAt', 'faculty', 'HOD', 'no_of_courses')

class FacultyAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'description', 'createdAt',)
    list_filter = ('name',)
    search_fields = ('name', 'code', 'description', 'createdAt', 'no_of_departments')

class FailedCourseAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'semester', 'year')
    list_filter = ('semester', 'year')
    search_fields = ('student', 'course', 'semester', 'year')

# Register your models here.
admin.site.register(Student, StudentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lecturer, LecturerAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(FailedCourse, FailedCourseAdmin)
