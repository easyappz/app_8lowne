from django.urls import path
from .views import HelloView, RegisterView, LoginView, ProfileView, MessagesListView

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("messages/", MessagesListView.as_view(), name="messages-list"),
]
