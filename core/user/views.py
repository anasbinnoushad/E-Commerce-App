from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsMerchant
from .models import User
from order.models import Order, OrderItem
from cart.models import Cart
from api.models import Product
from .permissions import IsAdmin, IsMerchant
from rest_framework.permissions import IsAuthenticated

class MerchantOnlyView(APIView):
    permission_classes = [IsMerchant]

    def get(self, request):
        return Response({"message": "Welcome Merchant"})


class TestProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated"})

# Generate JWT Token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
    }


# Register API
class RegisterView(APIView):
    permission_classes= [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)

            return Response({
                'user': {
                    'username': user.username,
                    'role': user.role
                },
                'token': tokens
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login API
class LoginView(APIView):
    permission_classes= [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            tokens = get_tokens_for_user(user)

            return Response({
                'user': {
                    'username': user.username,
                    'role': user.role
                },
                'token': tokens
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #Role dashboard
class CustomerDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        order = Order.objects.filter(user=request.user)
        cart = Cart.objects.get(user=request.user)
        return Response({
            "username": request.user.username,
            "role": request.user.role,
            "total_orders": order.count(),
        })
 
class MerchantDashboardView(APIView):
    permission_classes = [IsMerchant]
    def get(self, request):
        products = Product.objects.filter(seller=request.user)
        sold_items = OrderItem.objects.filter(product__seller=request.user)
        total_sales = sum(item.price * item.quantity for item in sold_items)
        return Response({
            "merchant": request.user.username,
            "total_products": products.count(),
            "total_sales": total_sales
        })
class AdminDashboardView(APIView):
    permission_classes = [IsAdmin]
    def get(self, request):
        return Response({
            "total_users": User.objects.count(),
            "total_products": Product.objects.count(),
            "total_orders": Order.objects.count(),
            "merchants": User.objects.filter(role='merchant').count(),
            "customers": User.objects.filter(role='customer').count()
        })
class UpgradeToMerchantView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.user.role == 'merchant':
            return Response({"message": "Already a merchant"})
        request.user.role = 'merchant'
        request.user.save()
        return Response({"message": "Upgraded to merchant successfully"})
