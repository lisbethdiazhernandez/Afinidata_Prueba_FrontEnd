import http
from urllib import request
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet

from todo.models import ToDo
from todo.serializer import TodoSerializer
 

@api_view(['GET'])
def TodoList(request):
	todo = ToDo.objects.all()
	serializer = TodoSerializer(todo, many=True)
	return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def TodoDetail(request, pk):
	todo = ToDo.objects.get(id=pk)
	serializer = TodoSerializer(todo, many=False)
	return JsonResponse(serializer.data , safe=False)



@api_view(['POST'])
def TodoCreate(request):
	serializer = TodoSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def todoUpdate(request, pk):
	todo = ToDo.objects.get(id=pk)
	serializer = TodoSerializer(instance=todo, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return JsonResponse(serializer.data, safe=False)



@api_view(['DELETE'])
def todoDelete(request, pk):
	todo = ToDo.objects.get(id=pk)
	todo.delete()

	return JsonResponse('Task succsesfully delete!')


class TodoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = TodoSerializer

