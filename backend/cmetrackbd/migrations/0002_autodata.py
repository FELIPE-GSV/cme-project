from django.db import migrations, models
import uuid
from django.contrib.auth.models import User

def create_initial_data(apps, schema_editor):
    Condition = apps.get_model('cmetrackbd', 'Condition')
    Category = apps.get_model('cmetrackbd', 'Category')
    Material = apps.get_model('cmetrackbd', 'Material')

    # Create conditions
    conditions = ['Novo', 'Usado', 'Danificado']
    for condition in conditions:
        Condition.objects.create(name=condition, identifier=uuid.uuid4())

    # Create categories
    categories = ['cirúrgico', 'dental', 'ortopédico', 'pediátrico', 'cardiológico']
    for category in categories:
        Category.objects.create(name=category, identifier=uuid.uuid4())

    # Create materials
    materials = [
        {'serial': '000001', 'name': 'Bisturi', 'type': 'Instrumento', 'expiry_date': '2030-01-01', 'campo': 'cirúrgico'},
        {'serial': '000002', 'name': 'Pinça', 'type': 'Instrumento', 'expiry_date': '2030-01-01', 'campo': 'dental'},
        {'serial': '000003', 'name': 'Seringa', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'ortopédico'},
        {'serial': '000004', 'name': 'Luvas', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'pediátrico'},
        {'serial': '000005', 'name': 'Avental', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'cardiológico'},
        {'serial': '000006', 'name': 'Máscara', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'cirúrgico'},
        {'serial': '000007', 'name': 'Gaze', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'dental'},
        {'serial': '000008', 'name': 'Compressa', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'ortopédico'},
        {'serial': '000009', 'name': 'Esparadrapo', 'type': 'Descartável', 'expiry_date': '2030-01-01', 'campo': 'pediátrico'},
        {'serial': '000010', 'name': 'Catéter', 'type': 'Instrumento', 'expiry_date': '2030-01-01', 'campo': 'cardiológico'},
    ]
    for material in materials:
        category = Category.objects.get(name=material['campo'])
        Material.objects.create(
            serial=material['serial'],
            name=material['name'],
            type=material['type'],
            expiry_date=material['expiry_date'],
            campo=material['campo'],
            category=category
        )

    # Create superuser
    User.objects.create_superuser('administrador', password='290916')

def noop(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('cmetrackbd', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data, reverse_code=noop),
    ]
