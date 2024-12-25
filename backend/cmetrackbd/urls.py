from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refreshLogin/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_superuser/', views.create_superuser, name='create_superuser'),
    path('list_users/', views.list_users, name='list_users'),
    path('get_user_by_token/', views.get_user_by_token, name='get_user_by_token')
]
