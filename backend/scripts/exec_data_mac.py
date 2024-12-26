import sys
import os
import django

# Adicione o caminho do diretório raiz do projeto ao sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cmetrackbd.settings')
django.setup()

from cmetrackbd.serializers import SuperUserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import render

def create_superuser():
    data = {
        "username": "admin",
        "password": "1234",
        "is_admin": True,
        "email": "admin@gmail.com"
    }
    serializer = SuperUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        print("CRIOU")
    else:
        print("Erro na validação:", serializer.errors)

# Chame a função para criar o superusuário
create_superuser()
#  docker exec -it cme-project-backend-1 python scripts/exec_data_mac.py