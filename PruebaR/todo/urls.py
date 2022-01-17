from django.urls import path 
from django.urls import   include
from todo import views
from rest_framework import routers
from todo.views import TodoViewSet

router = routers.DefaultRouter()
router.register(r'todo', TodoViewSet)


urlpatterns = [
    path('todo-list/', views.TodoList, name="todo-list"),
	path('todo-detail/<str:pk>/', views.TodoDetail, name="todo-detail"),
	path('todo-create/', views.TodoCreate, name="todo-create"),
	path('todo-update/<str:pk>/', views.todoUpdate, name="todo-update"),
	path('todo-delete/<str:pk>/', views.todoDelete, name="todo-delete"),
    path('api/', include(router.urls))
]

 