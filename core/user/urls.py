from django.urls import path
from .views import RegisterView, LoginView , TestProtectedView , MerchantOnlyView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('test/', TestProtectedView.as_view()),
    path('merchant-only/', MerchantOnlyView.as_view()),
]