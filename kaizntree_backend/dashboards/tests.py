from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase

from .models import Item, Category

class ItemAPITests(TestCase):

    def setUp(self):
        # Set up data for the tests
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword123')
        self.category = Category.objects.create(name="Electronics")
        self.item = Item.objects.create(SKU="123ABC", name="Test Item", category=self.category, stock_status="in_stock", available_stock=10)
        self.list_url = reverse('item-list')

    def test_item_list(self):
        """
        Ensure we can retrieve the item list.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  

    def test_obtain_auth_token(self):
        """
        Ensure we can obtain an auth token with valid credentials.
        """
        url = reverse('api_token_auth')
        data = {'username': 'testuser', 'password': 'testpassword123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_auth_required_endpoints(self):
        """
        Test endpoints that require authentication.
        """
        # Example: Accessing a protected endpoint without a token
        protected_url = reverse('protected-endpoint')  # Replace with your actual protected endpoint
        response = self.client.get(protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Accessing the same endpoint with authentication
        self.client.force_authenticate(user=self.user)  # Simulate authentication
        response = self.client.get(protected_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

