from django_summernote.widgets import SummernoteWidget
from django.contrib.auth.models import User
from django import forms
from .models import *
import requests

class AdminLoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Enter username...',
               'class': 'input100', 'id': 'loginuname'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Enter password...',
               'class': 'input100', 'id': 'loginpword'}))




class OrganizationForm(forms.ModelForm):
    class Meta:
        model = OrganizationalInformation
        fields = "__all__"
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'logo': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'background_image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'profile_image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'profile_video': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter youtube video link...'
            }),
            'vat_pan': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'address': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'slogan': SummernoteWidget(),
            'contact_no': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'alt_contact_no': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'office_time':forms.TextInput(attrs={
                'class':'form-control'

            }),
            'map_location': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
            }),
            'alt_email': forms.EmailInput(attrs={
                'class': 'form-control',
            }),
            'about_us': SummernoteWidget(),
            'facebook': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'instagram': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'twitter': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'youtube': forms.TextInput(attrs={
                'class': 'form-control',
            }),

            'whatsapp': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'viber': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'terms_and_conditions': SummernoteWidget(),
            'privacy_policy': SummernoteWidget(),
            'show_popup': forms.CheckboxInput(attrs={
                'class': 'form-control'
            }),
            'popup_image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'messenger_script': forms.Textarea(attrs={
                'class': 'form-control'
            }),
            'google_analytics_script': forms.Textarea(attrs={
                'class': 'form-control'
            })


        }


class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['title','image','description']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter title...'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control'
            }),
            'description':SummernoteWidget()
        }



class PackageCategoryForm(forms.ModelForm):
    class Meta:
        model = PackageCategory
        fields = ["title", "image", "description"]
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter title...'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'Enter little description...'
            })
        }


class PackageFeatureForm(forms.ModelForm):
    class Meta:
        model = PackageFeature
        fields = ["title", "icon", "short_intro"]
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter title...'
            }),
            'short_intro': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter one line intro...'
            }),
            "icon": forms.ClearableFileInput(attrs={
                'class': 'form-control',
            })
        }


class PackageForm(forms.ModelForm):
    images = forms.FileField(widget=forms.FileInput(attrs={
        'multiple': True,
    }), required=False)
    
    class Meta:
        model = Package
        fields = ['title','category','package_type','feature','image','duration','destination', 'locations','price','description','images','video', 'is_featured']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter title...'
            }),
            'category': forms.Select(attrs={
                'class': 'form-control select2',
                'placeholder': 'Enter package category'
            }),
            'package_type': forms.Select(attrs={
                'class': 'form-control select2',
                'placeholder': 'Choose Package Type'
            }),
            'feature': forms.CheckboxSelectMultiple(attrs={
                'placeholder': 'Choose Package Features'
            }),

            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control'
            }),
            'duration': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter duration...'
            }),
            'video': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter video url...'
            }),
            'destination': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter destination...'
            }),
            'locations': forms.SelectMultiple(attrs={
                'class': 'form-control select2',
            }),

            'price': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter price...'
            }),


            'description': SummernoteWidget(),
            'is_featured': forms.CheckboxInput(attrs={
                'class': "form-control",
            })
        }


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title','image','content', 'location']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter title...'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control'
            }),

            'content': SummernoteWidget(),
            'location': forms.Select(attrs={
                'class': 'form-control select2'
            })
        }


class AlbumForm(forms.ModelForm):
    images = forms.FileField(widget=forms.FileInput(attrs={
        'multiple': True,
    }), required=False)

    class Meta:
        model = Album
        fields = ['title','description']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter album name...'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Enter description...'
            }),
        }



class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = "__all__"
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'mobile': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 11
            }),

        }


class PackageInquiryForm(forms.ModelForm):
    class Meta:
        model = PackageInquiry
        fields = "__all__"
        exclude = ['package']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'mobile': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 2
            }),

        }


class HappyCustomerForm(forms.ModelForm):
    class Meta:
        model = HappyCustomer
        fields = ['name', 'stars','image','quote','current_engagement']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control'
            }),
            'stars': forms.Select(attrs={
                'class': 'form-control select2'
            }),

            'quote': SummernoteWidget(),

            'current_engagement': forms.TextInput(attrs={
                'class': 'form-control',
            }),

        }


class SubscribeForm(forms.ModelForm):
    class Meta:
        model = Subscribe
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter email',
                
            }),
        }


class SliderForm(forms.ModelForm):
    class Meta:
        model = Slider
        fields = ['title','image','caption']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'caption': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter caption...'
            }),
        }
class ContactForm(forms.Form):
    name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control'
    }))
    mobile = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control'
    }))
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'id': 'id_contact_email'
    }))
    message = forms.CharField(widget=forms.Textarea(attrs={
        'class': 'form-control',

    }))
    gc = forms.CharField(widget=forms.TextInput(attrs={
        "hidden": True
    }))

    def clean(self):
        gc = self.cleaned_data.get("gc")
        print(gc, "*******************")
        data = {
            "secret": "6LfxnOsUAAAAAPmRZ5-eBsfazyh0Yy-0BqtRuC9p",
            "response": gc
        }
        resp = requests.post("https://www.google.com/recaptcha/api/siteverify", data=data).json()
        if resp["success"] is True:
            pass
        else:
            raise forms.ValidationError("Captcha Error")

class FaqForm(forms.ModelForm):
    class Meta:
        model = Faq
        fields = ['question','answer']
        widgets ={
            'question': forms.TextInput(attrs={
                'class':'form-control'
            }),
            'answer': SummernoteWidget(), 
        }

class LocationForm(forms.ModelForm):
    class Meta:
        model = Location
        fields = ['name','slug']
        widgets = {
            'name':forms.TextInput(attrs={
                'class':'form-control'
            }),
            'slug':forms.TextInput(attrs={
                'class':'form-control'
            })
        }

class PageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ['title','slug','menu','image','description','position']
        widgets = {
            'title':forms.TextInput(attrs={
                'class':'form-control'
            }),
            'slug':forms.TextInput(attrs={
                'class':'form-control'
            }),
            'menu': forms.Select(attrs={
                'class': 'form-control select2',
                'placeholder': 'Choose Menu Type'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
            }),
            'description': SummernoteWidget(),
            'position': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter position...'
            }),

        }