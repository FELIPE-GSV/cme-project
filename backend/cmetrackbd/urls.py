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
    # users
    path('create_superuser/', views.create_superuser, name='create_superuser'),
    path('list_users/', views.list_users, name='list_users'),
    path('get_user_by_token/', views.get_user_by_token, name='get_user_by_token'),
    path("deleteUser/<int:user_id>", views.delete_user, name="delete_user"),
    path("findUser/<int:user_id>", views.find_user_by_id, name="find_user"),
    path("editUser/<int:user_id>", views.edit_user, name="edit_user"),

    # materials
    path('materials/create/', views.create_material, name='material-create'),
    path('materials/list/', views.list_materials, name='material-list'),
    path('materials/delete/', views.delete_all_materials, name='material-delete'),
    path('materials/<int:id_material>/delete/',
         views.delete_material_by_id, name='material-delete-by-id'),
    path('materials/<str:serial>/edit/',
         views.update_material, name='material-edit-by-id'),


    # categories
    path("categorys/create/", views.create_category, name="create_category"),
    path('categorys/list/', views.list_categories, name="list_categories"),
    path('categorys/get_by_id/<int:cat_id>',
         views.get_category_by_id, name="get_category_by_id"),
]
