from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from .serializers import (
    MessageSerializer,
    MemberSerializer,
    RegisterSerializer,
    LoginSerializer,
)
from .models import Member


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class RegisterView(APIView):
    """
    Register a new user.
    """

    permission_classes = [AllowAny]

    @extend_schema(
        request=RegisterSerializer,
        responses={201: MemberSerializer},
        description="Register a new user and return authentication token",
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            member = serializer.save()
            token, created = Token.objects.get_or_create(user_id=member.id)

            return Response(
                {
                    "id": member.id,
                    "username": member.username,
                    "token": token.key,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response({"error": str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    Login user and return token.
    """

    permission_classes = [AllowAny]

    @extend_schema(
        request=LoginSerializer,
        responses={200: MemberSerializer},
        description="Authenticate user and return authentication token",
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST
            )

        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        try:
            member = Member.objects.get(username=username)
        except Member.DoesNotExist:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not member.check_password(password):
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token, created = Token.objects.get_or_create(user_id=member.id)

        return Response(
            {
                "id": member.id,
                "username": member.username,
                "token": token.key,
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(APIView):
    """
    Get current user profile.
    """

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: MemberSerializer},
        description="Get current authenticated user profile",
    )
    def get(self, request):
        try:
            token_key = request.auth.key
            token = Token.objects.get(key=token_key)
            member = Member.objects.get(id=token.user_id)

            return Response(
                {
                    "id": member.id,
                    "username": member.username,
                },
                status=status.HTTP_200_OK,
            )
        except (Token.DoesNotExist, Member.DoesNotExist):
            return Response(
                {"error": "Invalid token or user not found"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
