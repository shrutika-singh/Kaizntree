from rest_framework import generics, permissions
from .models import Item
from .serializers import ItemSerializer
from django.db.models import Q
from .ObtainAuthToken import ObtainAuthToken

class ItemListView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        queryset = Item.objects.all()
        stock_status = self.request.query_params.get('stock_status')
        search_query = self.request.query_params.get('search')
        if stock_status:
            queryset = queryset.filter(stock_status=stock_status)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(SKU__icontains=search_query)
            )
        return queryset
