from django.db import models
import uuid


# Categorias de Material
class Category(models.Model):
    name = models.CharField(max_length=255)
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.name

# Condições de Material
class Condition(models.Model):
    name = models.CharField(max_length=255)
    identifier = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.name

# Materiais
class Material(models.Model):
    serial = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    expiry_date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    campo = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if not self.serial:
            # Contar o número de materiais existentes
            material_count = Material.objects.filter(name=self.name).count() + 1
            self.serial = f"{self.name}{material_count:06d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.serial



# Recebimento de Materiais
class ReceivingMaterials(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    entry_date = models.DateField()
    need_washing = models.BooleanField()
    need_sterilization = models.BooleanField()
    quantity = models.IntegerField()
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE)
    need_discard = models.BooleanField()
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"{self.material.serial} - {self.entry_date}"

# Tratamento de Materiais
class Tratament(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    washing = models.BooleanField()
    sterilization = models.BooleanField()
    distribution = models.BooleanField()
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    finish_at = models.DateField()

    def __str__(self):
        return str(self.identifier)
