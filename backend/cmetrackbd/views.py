from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework import status
from django.contrib.auth.models import User
from .serializers import SuperUserSerializer, UserListSerializer, MaterialSerializer,ListMaterialSerializer, CategorySerializer, ConditionSerializer, ReceivingMaterialsSerializer,CreateReceivingMaterialsSerializer, TratamentSerializer, CreateTratamentSerializer
from .models import Category, Material, Condition, ReceivingMaterials, Tratament

# Users


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_token(request):
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
        'id': user.id,
        'is_admin': user.is_superuser
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


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response({"message": "Usuário deletado com sucesso"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def find_user_by_id(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserListSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def edit_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = SuperUserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        updated_user = SuperUserSerializer(user).data
        return Response(updated_user, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# MATERIAL


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_material(request):

    if request.method == 'POST':
        data = request.data
        # Verificar se a categoria existe
        category_id = data.get('category')
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"category": ["Pk inválido \"{}\" - objeto não existe.".format(category_id)]}, status=status.HTTP_400_BAD_REQUEST)

        # Remover o campo serial do data antes de criar o material
        data.pop('serial', None)

        serializer = MaterialSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_material(request, serial):
    try:
        material = Material.objects.get(serial=serial)
    except Material.DoesNotExist:
        return Response({"error": "Material not found."}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    # Verificar se a categoria existe
    category_id = data.get('category')
    if category_id:
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return Response({"category": ["Pk inválido \"{}\" - objeto não existe.".format(category_id)]}, status=status.HTTP_400_BAD_REQUEST)

    # Remover o campo serial do data para não tentar atualizá-lo
    data.pop('serial', None)

    serializer = MaterialSerializer(material, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_materials(request):
    if request.method == 'GET':
        materials = Material.objects.all()
        serializer = ListMaterialSerializer(materials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Deletar todos os materiais


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_materials(request):
    if request.method == 'DELETE':
        count, _ = Material.objects.all().delete()
        return Response({'message': f'{count} materials were deleted.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_material_by_id(request, id_material):
    if request.method == 'DELETE':
        material = Material.objects.get(id=id_material)
        material.delete()
        return Response({"message": "Deletado com sucesso!"}, status=status.HTTP_202_ACCEPTED)
    return Response({"message": "Material não encontrado."}, status=status.HTTP_404_NOT_FOUND)


# Categorias

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_categories(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_category_by_id(request, cat_id):
    if request.method == 'GET':
        categories = Category.objects.get(id=cat_id)
        serializer = CategorySerializer(categories)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_category(request):
    if request.method == 'POST':
        data = request.data
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_all_categories(request): 
    if request.method == 'DELETE':
        count, _ = Category.objects.all().delete()
        return Response({'message': f'{count} materials were deleted.'}, status=status.HTTP_204_NO_CONTENT)

# RECEIVING MATERIALS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_receiving_materials(request):
    if request.method == 'POST':
        data = request.data
        try:
            material = Material.objects.get(serial=data['material'])
            condition = Condition.objects.get(identifier=data['condition'])
            data['material'] = material.pk
            data['condition'] = condition.pk
            serializer = CreateReceivingMaterialsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Material.DoesNotExist:
            return Response({'error': 'Material not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Condition.DoesNotExist:
            return Response({'error': 'Condition not found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_receiving_materials(request, id):
    try:
        receiving_material = ReceivingMaterials.objects.get(id=id)
    except ReceivingMaterials.DoesNotExist:
        return Response({'error': 'ReceivingMaterials not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    try:
        material = Material.objects.get(serial=data['material'])
        condition = Condition.objects.get(identifier=data['condition'])
        data['material'] = material.pk
        data['condition'] = condition.pk
        serializer = CreateReceivingMaterialsSerializer(receiving_material, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Material.DoesNotExist:
        return Response({'error': 'Material not found'}, status=status.HTTP_400_BAD_REQUEST)
    except Condition.DoesNotExist:
        return Response({'error': 'Condition not found'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_receiving_materials(request):
    if request.method == 'GET':
        materials = ReceivingMaterials.objects.all()
        serializer = ReceivingMaterialsSerializer(materials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_receiving_materials(request):
    if request.method == 'DELETE':
        materials = ReceivingMaterials.objects.all()
        materials.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_receiving_materials_by_serial(request, serial):
    if request.method == 'GET':
        materials = ReceivingMaterials.objects.get(material__serial=serial)
        serializer = ReceivingMaterialsSerializer(materials)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_receiving_materials(request, id_delete):
    try:
        receiving_material = ReceivingMaterials.objects.get(id=id_delete)
        receiving_material.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ReceivingMaterials.DoesNotExist:
        return Response({'error': 'ReceivingMaterials not found'}, status=status.HTTP_404_NOT_FOUND)


# CONDITIONS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_conditions(request):
    if request.method == 'GET':
        conditions = Condition.objects.all()
        serializer = ConditionSerializer(conditions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_condition_by_id(request, id_to_delete):
    if request.method == 'DELETE':
        print(f"AQUI {id_to_delete}")
        try:
            condition = Condition.objects.get(identifier=id_to_delete)
        except:
            return Response({"message": "Condição não encontrada"}, status=status.HTTP_404_NOT_FOUND)
        condition.delete()
        return Response({"message": "Deletado com sucesso"}, status=status.HTTP_202_ACCEPTED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_receiving_materials(request, id_delete):
    try:
        receiving_material = ReceivingMaterials.objects.get(id=id_delete)
        receiving_material.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ReceivingMaterials.DoesNotExist:
        return Response({'error': 'ReceivingMaterials not found'}, status=status.HTTP_404_NOT_FOUND)


# TRATAMENTS


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_trataments(request):
    if request.method == 'GET':
        trataments = Tratament.objects.all()
        serializer = TratamentSerializer(trataments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_trataments(request):
    if request.method == 'DELETE':
        trataments = Tratament.objects.all()
        trataments.delete()
        return Response({"message": "deletado com sucesso."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tratament(request):
    if request.method == 'POST':
        data = request.data
        try:
            receiving_material = ReceivingMaterials.objects.get(material__serial=data['material'])
            material = receiving_material.material
            data['material'] = material.pk
            serializer = CreateTratamentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                response_data = serializer.data
                response_data['material'] = MaterialSerializer(material).data
                return Response(response_data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ReceivingMaterials.DoesNotExist:
            return Response({'error': 'Este material não foi solicitado!'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_tratament(request, id):
    try:
        tratament = Tratament.objects.get(id=id)
    except Tratament.DoesNotExist:
        return Response({'error': 'Tratament not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    try:
        material = Material.objects.get(serial=data['material'])
        data['material'] = material.pk
        serializer = CreateTratamentSerializer(tratament, data=data)
        if serializer.is_valid():
            serializer.save()
            response_data = serializer.data
            response_data['material'] = MaterialSerializer(material).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Material.DoesNotExist:
        return Response({'error': 'Material not found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_tratament(request, id):
    try:
        tratament = Tratament.objects.get(id=id)
        tratament.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Tratament.DoesNotExist:
        return Response({'error': 'Tratament not found'}, status=status.HTTP_404_NOT_FOUND)





