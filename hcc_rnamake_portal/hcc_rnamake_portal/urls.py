
from django.urls import path

from . import views

app_name = 'hcc_rnamake_portal'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('demo/', views.demo, name='demo'),
]
