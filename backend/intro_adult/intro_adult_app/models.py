# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class adult(models.Model):
    id = models.IntegerField(primary_key=True)
    age = models.IntegerField()
    workclass = models.CharField(max_length=100)
    fnlwgt = models.IntegerField()
    education = models.CharField(max_length=100)
    education_num = models.IntegerField()
    marital_status = models.CharField(max_length=100)
    occupation = models.CharField(max_length=100)
    relationship = models.CharField(max_length=100)
    race = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    capital_gain = models.IntegerField()
    capital_loss = models.IntegerField()
    hours_per_week = models.IntegerField()
    native_country = models.CharField(max_length=100)
    Listing_of_attributes = models.CharField(max_length=100)