from django.urls import path
from . import views

app_name = 'auction'
urlpatterns = [
    path('', views.index, name="index"),
    path('home', views.home, name="home"),
    path('create_auction_text', views.create_auction_text, name="create_auction_text")
]
