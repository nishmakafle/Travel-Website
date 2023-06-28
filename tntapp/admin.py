from django.contrib import admin
from .models import *


admin.site.register([OrganizationalInformation, Slider, Service, Location, Page,
                     PackageCategory, Package, PackageFeature, Album, Image,
                     Message, HappyCustomer, Subscribe,PackageInquiry,Faq])
