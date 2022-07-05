"""studentportal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from students import views
#template view
from django.views.generic import TemplateView
#impoorts views.py from students app

#from students.urls import student_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.student_list),
    re_path(r'^api/students/(?P<pk>[0-9]+)$', views.student_detail),
    path('', views.front, name='front'),
    path('api/', include('students.urls')),
    path('/', TemplateView.as_view(template_name='index.html')),
]

#urlpatterns += student_urlpatterns #adds student_urlpatterns to urlpatterns

print(urlpatterns)
