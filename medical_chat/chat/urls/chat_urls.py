from django.urls import path
from chat.views import chat_views as views

urlpatterns = [
   #path('', views.ChatView.as_view(), name='chat'),
    path('search/', views.search, name='chat'),


    #path('', views.index, name='index'),
]
