from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsMerchant

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
