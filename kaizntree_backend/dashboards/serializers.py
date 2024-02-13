from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['SKU', 'name', 'category', 'tags', 'stock_status', 'available_stock','in_stock']
