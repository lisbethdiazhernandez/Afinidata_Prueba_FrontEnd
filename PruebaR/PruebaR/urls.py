"""PruebaR URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer 
from django.contrib import admin
from django.urls import path  , re_path
from django.conf.urls import include 

# Create our schema's view w/ the get_schema_view() helper method. Pass in the proper Renderers for swagger
#schema_view = get_schema_view(title='ToDo API', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer])

urlpatterns = [
    #re_path(r'^', schema_view, name="docs"),
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls'))
    
]
