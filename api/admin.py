from django.contrib import admin
from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["username"]
    readonly_fields = ["created_at"]
    ordering = ["-created_at"]
