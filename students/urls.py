from django.db import router
from django.urls import path, include, re_path

from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'reg-courses', views.RegisteredCourseView, basename='registercourse')
router.register(r'failed-courses', views.FailedCourseRegistrationView, basename='regfailedcourse')
router.register(r'result', views.ResultView, basename='results')

app_name = 'students'
urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('test/', views.testEndPoint, name='test'),
    path('courses/', views.CourseView.as_view()),
    path('failed-course/', views.FailedCourseView.as_view()),
    re_path(r'^v1/', include(router.urls)),
]

