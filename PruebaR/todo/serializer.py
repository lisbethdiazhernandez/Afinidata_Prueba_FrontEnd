from pyexpat import model
from rest_framework import serializers
from todo.models import  ToDo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields=('id', 'name','state')