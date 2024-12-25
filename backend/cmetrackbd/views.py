from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework import status
from django.contrib.auth.models import User
from .serializers import SuperUserSerializer, UserListSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_token(request):
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
        'id': user.id
    }
    return Response(user_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_superuser(request):
    if request.method == 'POST':
        serializer = SuperUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def list_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
