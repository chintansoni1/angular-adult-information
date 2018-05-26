'''
author- Chintan Soni
Date- 26/5/18
email- chintansoni1@yahoo.in
'''

from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse
from .models import adult
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Count

#Create your views here.

class Data(TemplateView):

    def get_data(request):
        # perform the Bind operation
        server = adult.objects.values('sex','workclass','fnlwgt', 'education', 'education_num', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'capital_gain', 'capital_loss', 'hours_per_week', 'native_country', 'Listing_of_attributes')
        #server_serialize = serializers.serialize('json', server)
        return JsonResponse(list(server), safe=False)
	
    def get_sex(request):
        # perform the Bind operation
        male_count = adult.objects.filter(sex=' Male').aggregate(m_count=Count('id'))
        female_count = adult.objects.filter(sex=' Female').aggregate(f_count=Count('id'))
        return JsonResponse([male_count,female_count], safe=False)
		
    def get_relationship(request):
        # perform the Bind operation
        server = adult.objects.values('relationship')
        return JsonResponse(list(server), safe=False)
	
    def get_race(request):
        # perform the Bind operation
        server = adult.objects.values('race')
        return JsonResponse(list(server), safe=False)
