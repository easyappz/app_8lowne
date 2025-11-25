from rest_framework import serializers
from .models import Member


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class MemberSerializer(serializers.ModelSerializer):
    """Serializer for displaying member profile."""

    class Meta:
        model = Member
        fields = ["id", "username"]
        read_only_fields = ["id", "username"]


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,
        style={"input_type": "password"},
    )

    class Meta:
        model = Member
        fields = ["id", "username", "password"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "username": {
                "required": True,
                "min_length": 3,
                "max_length": 150,
            }
        }

    def validate_username(self, value):
        """Check if username already exists."""
        if Member.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        """Create a new member with hashed password."""
        member = Member(
            username=validated_data["username"],
        )
        member.set_password(validated_data["password"])
        member.save()
        return member


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""

    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={"input_type": "password"},
    )

    def validate(self, attrs):
        """Validate username and password."""
        username = attrs.get("username")
        password = attrs.get("password")

        if not username or not password:
            raise serializers.ValidationError("Username and password are required.")

        return attrs
