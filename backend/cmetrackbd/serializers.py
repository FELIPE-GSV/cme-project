from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Material, Category, Condition, ReceivingMaterials, Tratament

class SuperUserSerializer(serializers.ModelSerializer):
    # Campo de entrada, não parte do modelo User
    is_admin = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        is_admin = validated_data.pop('is_admin')
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        if is_admin:
            user.is_staff = True
            user.is_superuser = True
        user.save()
        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'serial', 'name', 'type', 'expiry_date', 'category', 'campo']
        extra_kwargs = { 'serial': {'required': False}}


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'identifier']


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'

class CreateReceivingMaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceivingMaterials
        fields = '__all__'

class ReceivingMaterialsSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    condition = ConditionSerializer(read_only=True)
    class Meta:
        model = ReceivingMaterials
        fields = '__all__'


class TratamentSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)

    class Meta:
        model = Tratament
        fields = '__all__'

class CreateTratamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tratament
        fields = '__all__'





