from django.db import migrations
import uuid
from django.contrib.auth.models import User


def create_initial_data(apps, schema_editor):
    Category = apps.get_model('cmetrackbd', 'Category')
    Material = apps.get_model('cmetrackbd', 'Material')

    # Adiciona categorias
    categories = [
        {'name': 'Categoria 1'},
        {'name': 'Categoria 2'},
        {'name': 'Categoria 3'},
        {'name': 'Categoria 4'},
        {'name': 'Categoria 5'},
    ]
    for category_data in categories:
        Category.objects.create(**category_data)

    # Adiciona materiais
    materials = [
        {'serial': 'S0001', 'name': 'Material 1', 'type': 'Type A', 'expiry_date': '2025-12-31', 'campo': 'Campo 1', 'category_id': 1},
        {'serial': 'S0002', 'name': 'Material 2', 'type': 'Type A', 'expiry_date': '2025-12-31', 'campo': 'Campo 1', 'category_id': 1},
        {'serial': 'S0003', 'name': 'Material 3', 'type': 'Type B', 'expiry_date': '2025-12-31', 'campo': 'Campo 2', 'category_id': 2},
        {'serial': 'S0004', 'name': 'Material 4', 'type': 'Type B', 'expiry_date': '2025-12-31', 'campo': 'Campo 2', 'category_id': 2},
        {'serial': 'S0005', 'name': 'Material 5', 'type': 'Type C', 'expiry_date': '2025-12-31', 'campo': 'Campo 3', 'category_id': 3},
        {'serial': 'S0006', 'name': 'Material 6', 'type': 'Type C', 'expiry_date': '2025-12-31', 'campo': 'Campo 3', 'category_id': 3},
        {'serial': 'S0007', 'name': 'Material 7', 'type': 'Type D', 'expiry_date': '2025-12-31', 'campo': 'Campo 4', 'category_id': 4},
        {'serial': 'S0008', 'name': 'Material 8', 'type': 'Type D', 'expiry_date': '2025-12-31', 'campo': 'Campo 4', 'category_id': 4},
    ]
    for material_data in materials:
        Material.objects.create(**material_data)

    # Cria superusuário
    User.objects.create_superuser('administrador', 'admin@example.com', '290916')


class Migration(migrations.Migration):

    dependencies = [
        ('cmetrackbd', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data),
    ]
