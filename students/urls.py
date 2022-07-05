from django.urls import path

from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'students'
urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('test/', views.testEndPoint, name='test')
]