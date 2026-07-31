from django.urls import path
from .views import RegisterView, LoginView , TestProtectedView , MerchantOnlyView

from django.urls import path
from .views import ( CustomerDashboardView, MerchantDashboardView, AdminDashboardView, UpgradeToMerchantView )

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('test/', TestProtectedView.as_view()),
    path('merchant-only/', MerchantOnlyView.as_view()),
    path('customer-dashboard/', CustomerDashboardView.as_view()),
    path('merchant-dashboard/', MerchantDashboardView.as_view()),
    path('admin-dashboard/', AdminDashboardView.as_view()),
    path('upgrade-merchant/', UpgradeToMerchantView.as_view()),
]