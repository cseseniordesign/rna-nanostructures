
from django.urls import path, re_path

from . import views

app_name = 'hcc_rnamake_portal'
urlpatterns = [
    path('workspace/', views.demo, name='home'),
    re_path(r"^", views.demo, name='demo'),
]
