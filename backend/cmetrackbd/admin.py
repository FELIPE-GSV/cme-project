from django.contrib import admin
from .models import Material, Category, ReceivingMaterials, Tratament


admin.site.register(Material)
admin.site.register(Category)
admin.site.register(ReceivingMaterials)
admin.site.register(Tratament)
