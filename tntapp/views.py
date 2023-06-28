from django.contrib.auth import authenticate, login, logout
from django.urls import reverse, reverse_lazy
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.generic import *
from django.conf import settings
from django.db.models import Q
from .forms import *


# Create your views here.

class UnderConstructionView(TemplateView):
	template_name = 'clienttemplates/unserconstruction.html'


class AdminMixin(object):
    def dispatch(self, request, *args, **kwargs):
        path = request.path 
        if request.user.is_authenticated and request.user.is_staff is True:
            pass
        else:
            return redirect(reverse("tntapp:adminlogin") + "?next=" + path)
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super(AdminMixin, self).get_context_data(**kwargs)
        context['organization'] = OrganizationalInformation.objects.last()
        return context


class AdminLoginView(FormView):
    template_name = "authtemplates/adminlogin.html"
    form_class = AdminLoginForm
    success_url = reverse_lazy("tntapp:adminorganization")

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(self.request, user)
        else:

            return render(self.request, self.template_name, {
                'form': form,
                'error': 'Invalid credentials'
            })

        return super().form_valid(form)


class AdminLogoutView(View):

    def get(self, request):
        logout(request)
        return redirect("/admin-login/")


# Admin Views

class AdminHomeView(AdminMixin, TemplateView):
    template_name = 'admintemplates/adminhome.html'


class AdminOrganizationView(AdminMixin, TemplateView):
    template_name = "admintemplates/adminorganization.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["organization"] = OrganizationalInformation.objects.last()
        context["allmessage"] = Message.objects.all()
        context['allsubscriber'] = Subscribe.objects.all()
        context['allhappycustomer'] = HappyCustomer.objects.all()
        context['allarticle'] = Article.objects.all()
        context['allpackageinquery'] = PackageInquiry.objects.all()
        return context


class AdminOrganizationUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminorganizationupdate.html"
    form_class = OrganizationForm
    model = OrganizationalInformation
    success_url = reverse_lazy('tntapp:adminorganization')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["organization"] = OrganizationalInformation.objects.last()

        return context

 # Service Views


class AdminServiceCreateView(AdminMixin, CreateView):
    template_name = 'admintemplates/adminservicecreate.html'
    form_class = ServiceForm
    success_url = reverse_lazy("tntapp:adminservicelist")


class AdminServiceListView(AdminMixin, ListView):
    template_name = 'admintemplates/adminservicelist.html'
    model = Service
    context_object_name = 'services'


class AdminServiceUpdateView(AdminMixin, UpdateView):
    model = Service
    form_class = ServiceForm
    template_name = "admintemplates/adminservicecreate.html"
    success_url = reverse_lazy('tntapp:adminservicelist')


class AdminServiceDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminservicedelete.html"
    model = Service
    success_url = reverse_lazy('tntapp:adminservicelist')

# Package-Category Views


class AdminPackageCategoryListView(AdminMixin, ListView):
    template_name = "admintemplates/adminpackagecategorylist.html"
    queryset = PackageCategory.objects.all().order_by('-id')
    context_object_name = "adminpackagecategorylist"


class AdminPackageCategoryCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminpackagecategorycreate.html"
    form_class = PackageCategoryForm
    success_url = reverse_lazy('tntapp:adminpackagecategorylist')


class AdminPackageCategoryUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminpackagecategorycreate.html"
    form_class = PackageCategoryForm
    model = PackageCategory
    success_url = reverse_lazy('tntapp:adminpackagecategorylist')


class AdminPackageCategoryDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminpackagecategorydelete.html"
    model = PackageCategory
    success_url = reverse_lazy('tntapp:adminpackagecategorylist')

# Package-Feature View


class AdminPackageFeatureListView(AdminMixin, ListView):
    template_name = "admintemplates/adminpackagefeaturelist.html"
    queryset = PackageFeature.objects.all().order_by('-id')
    context_object_name = "adminpackagefeaturelist"


class AdminPackageFeatureCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminpackagefeaturecreate.html"
    form_class = PackageFeatureForm
    success_url = reverse_lazy('tntapp:adminpackagefeaturelist')


class AdminPackageFeatureUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminpackagefeaturecreate.html"
    form_class = PackageFeatureForm
    model = PackageFeature
    success_url = reverse_lazy('tntapp:adminpackagefeaturelist')


class AdminPackageFeatureDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminpackagefeaturedelete.html"
    model = PackageFeature
    success_url = reverse_lazy('tntapp:adminpackagefeaturelist')

# Location Views
class AdminLocationCreateView(AdminMixin,CreateView):
    template_name = "admintemplates/adminlocationcreate.html"
    form_class = LocationForm
    success_url = reverse_lazy('tntapp:adminlocationlist')

class AdminLocationListView(AdminMixin,ListView):
    template_name = 'admintemplates/adminlocationlist.html'
    queryset = Location.objects.all().order_by('-id')
    context_object_name = 'adminlocationlist'

class AdminLocationUpdateView(AdminMixin, UpdateView):
    template_name = 'admintemplates/adminlocationcreate.html'
    model = Location
    form_class = LocationForm
    success_url = reverse_lazy('tntapp:adminlocationlist')

class AdminLocationDeleteView(AdminMixin, DeleteView):
    template_name = 'admintemplates/adminlocationdelete.html'
    model = Location
    success_url = reverse_lazy('tntapp:adminlocationlist')

# Package Views

class AdminPackageListView(AdminMixin, ListView):
    template_name = "admintemplates/adminpackagelist.html"
    queryset = Package.objects.all().order_by('-id')
    context_object_name = "adminpackagelist"



class AdminPackageCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminpackagecreate.html"
    form_class = PackageForm
    success_url = reverse_lazy('tntapp:adminpackagelist')

    def form_invalid(self,form):
        print(form.errors)
        return super().form_invalid(form)

    def form_valid(self, form):
        package = form.save()
        images = self.request.FILES.getlist("images")
        for image in images:
            PackageImage.objects.create(package=package, image=image )

        return super().form_valid(form)


class AdminPackageUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminpackagecreate.html"
    form_class = PackageForm
    model = Package
    success_url = reverse_lazy('tntapp:adminpackagelist')

    def form_valid(self, form):
        package = form.save()
        images = self.request.FILES.getlist("images")
        for image in images:
            PackageImage.objects.create(package=package, image=image )

        return super().form_valid(form)


class AdminPackageDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminpackagedelete.html"
    model = Package
    success_url = reverse_lazy('tntapp:adminpackagelist')

# Pages Views

class AdminPageCreateView(AdminMixin,CreateView):
    template_name = 'admintemplates/adminpagecreate.html'
    form_class = PageForm 
    success_url = reverse_lazy('tntapp:adminpagelist')

class AdminPageListView(AdminMixin, ListView):
    template_name = 'admintemplates/adminpagelist.html'
    queryset = Page.objects.all().order_by('-id')
    context_object_name = 'adminpagelist'

class AdminPageUpdateView(AdminMixin, UpdateView):
    template_name = 'admintemplates/adminpagecreate.html'
    model = Page
    form_class = PageForm 
    success_url = reverse_lazy('tntapp:adminpagelist')

class AdminPageDeleteView(AdminMixin, DeleteView):
    template_name = 'admintemplates/adminpagedelete.html'
    model = Page
    success_url = reverse_lazy('tntapp:adminpagelist')


# Article Views


class AdminArticleListView(AdminMixin, ListView):
    template_name = "admintemplates/adminarticlelist.html"
    queryset = Article.objects.all().order_by('-id')
    context_object_name = "adminarticlelist"


class AdminArticleCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminarticlecreate.html"
    form_class = ArticleForm
    success_url = reverse_lazy('tntapp:adminarticlelist')


class AdminArticleUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminarticlecreate.html"
    form_class = ArticleForm
    model = Article
    success_url = reverse_lazy('tntapp:adminarticlelist')


class AdminArticleDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminarticledelete.html"
    model = Article
    success_url = reverse_lazy('tntapp:adminarticlelist')

# Album Views


class AdminAlbumListView(AdminMixin, ListView):
    template_name = "admintemplates/adminalbumlist.html"
    queryset = Album.objects.all().order_by('-id')
    context_object_name = "adminalbumlist"


class AdminAlbumCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminalbumcreate.html"
    form_class = AlbumForm
    success_url = reverse_lazy('tntapp:adminalbumlist')

    def form_valid(self, form):
        album = form.save()
        images = self.request.FILES.getlist("images")
        for image in images:
            Image.objects.create(album=album, image=image, caption="")

        return super().form_valid(form)


class AdminAlbumUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminalbumcreate.html"
    form_class = AlbumForm
    model = Album
    success_url = reverse_lazy('tntapp:adminalbumlist')

    def form_valid(self, form):
        album = Album.objects.get(id=self.kwargs['pk'])
        images = self.request.FILES.getlist("images")
        for image in images:
            Image.objects.create(album=album, image=image, caption="")

        return super().form_valid(form)


class AdminAlbumDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminalbumdelete.html"
    model = Album
    success_url = reverse_lazy('tntapp:adminalbumlist')


class AjaxImageDelete(AdminMixin, View):
    def get(self, request, *args, **kwargs):
        img_id = self.kwargs['pk']
        img = Image.objects.get(id=img_id)
        img.delete()
        message = "success"
        return JsonResponse({"message": message})

# Message Views


class AdminMessageListView(AdminMixin, ListView):
    template_name = "admintemplates/adminmessagelist.html"
    queryset = Message.objects.all().order_by('-id')
    context_object_name = "adminmessagelist"


class AdminMessageDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminmessagedelete.html"
    model = Message
    success_url = reverse_lazy('tntapp:adminmessagelist')


class AdminMessageDetailView(AdminMixin, DetailView):
    model = Message
    template_name = "admintemplates/adminmessagedetail.html"
    context_object_name = 'message'


class AdminPackageInquiryListView(AdminMixin, ListView):
    template_name = 'admintemplates/adminpackageinquerylist.html'
    queryset = PackageInquiry.objects.all().order_by('-id')
    context_object_name = 'adminpackageinquirylist'


class AdminPackageInquiryDetailView(AdminMixin, DetailView):
    template_name = 'admintemplates/adminpackageinquerydetail.html'
    model = PackageInquiry
    context_object_name = 'packageinquiry'


class AdminPackageInquiryDeleteView(AdminMixin, DeleteView):
    template_name = 'admintemplates/adminpackageinquerydelete.html'
    model = PackageInquiry
    success_url = reverse_lazy("tntapp:adminpackageinquirylist")


# HappyCustomer Views

class AdminHappyCustomerListView(AdminMixin, ListView):
    template_name = "admintemplates/adminhappycustomerlist.html"
    queryset = HappyCustomer.objects.all().order_by('-id')
    context_object_name = "adminhappycustomerlist"


class AdminHappyCustomerDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminhappycustomerdelete.html"
    model = HappyCustomer
    success_url = reverse_lazy('tntapp:adminhappycustomerlist')


class AdminHappyCustomerCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminhappycustomercreate.html"
    form_class = HappyCustomerForm
    success_url = reverse_lazy('tntapp:adminhappycustomerlist')


class AdminHappyCustomerUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminhappycustomercreate.html"
    form_class = HappyCustomerForm
    model = HappyCustomer
    success_url = reverse_lazy('tntapp:adminhappycustomerlist')

# Slider Views


class AdminSliderListView(AdminMixin, ListView):
    template_name = "admintemplates/adminsliderlist.html"
    queryset = Slider.objects.all().order_by('-id')
    context_object_name = "adminsliderlist"


class AdminSliderCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminslidercreate.html"
    form_class = SliderForm
    success_url = reverse_lazy('tntapp:adminsliderlist')


class AdminSliderUpdateView(AdminMixin, UpdateView):
    template_name = "admintemplates/adminslidercreate.html"
    form_class = SliderForm
    model = Slider
    success_url = reverse_lazy('tntapp:adminsliderlist')


class AdminSliderDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminsliderdelete.html"
    model = Slider
    success_url = reverse_lazy('tntapp:adminsliderlist')

# Subscribe Views


class AdminSubscribeListView(AdminMixin, ListView):
    template_name = "admintemplates/adminsubscribelist.html"
    queryset = Subscribe.objects.all().order_by('-id')
    context_object_name = "adminsubscribelist"


class AdminSubscribeDeleteView(AdminMixin, DeleteView):
    template_name = "admintemplates/adminsubscribedelete.html"
    model = Subscribe
    success_url = reverse_lazy('tntapp:adminsubscribelist')
# Faq Views


class AdminFaqCreateView(AdminMixin, CreateView):
    template_name = "admintemplates/adminfaqcreate.html"
    form_class = FaqForm
    success_url = reverse_lazy('tntapp:adminfaqlist')


class AdminFaqListView(AdminMixin, ListView):
    template_name = "admintemplates/adminfaqlist.html"
    model = Faq
    context_object_name = 'adminfaqlist'


class AdminFaqUpdateView(AdminMixin, UpdateView):
    template_name = 'admintemplates/adminfaqcreate.html'
    form_class = FaqForm
    model = Faq
    success_url = reverse_lazy('tntapp:adminfaqlist')


class AdminFaqDeleteView(AdminMixin, DeleteView):
    template_name = 'admintemplates/adminfaqdelete.html'
    model = Faq
    success_url = reverse_lazy('tntapp:adminfaqlist')


# Client Views

class ClientMixin(object):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["alltermsandcondtions"] = OrganizationalInformation.objects.all()
        context['cpages'] = Page.objects.filter(menu="Company")
        context["privacypolicy"] = OrganizationalInformation.objects.all()
        context["abouts"] = OrganizationalInformation.objects.all()
        context['packagecategorylist'] = PackageCategory.objects.all()
        context['destinationlist'] = Location.objects.all()
        context['organization'] = OrganizationalInformation.objects.first()
        context['inform'] = PackageInquiryForm
        context['recentblogs'] = Article.objects.order_by('-id')[:5]
        context['subsform'] = SubscribeForm
        context['allimages'] = Image.objects.order_by("?")[:6]
        return context


class ClientHomeView(ClientMixin, TemplateView):
    template_name = "clienttemplates/clienthome.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_packages'] = Package.objects.filter(is_featured=True)
        context['recentpackages'] = Package.objects.order_by("-id")[:4]
        context['sliders'] = Slider.objects.all()
        context['happycustomers'] = HappyCustomer.objects.order_by('?')[:1]
        return context


class ClientContactView(ClientMixin, FormView):
    template_name = 'clienttemplates/clientcontact.html'
    form_class = ContactForm
    success_url = reverse_lazy("tntapp:clientcontact")

    def form_valid(self, form):
        name = form.cleaned_data['name']
        mobile = form.cleaned_data['mobile']
        email = form.cleaned_data['email']
        message = form.cleaned_data['message']
        
        Message.objects.create(name=name, mobile=mobile, email=email,
                               message=message)
        return super().form_valid(form)


class ClientFaqView(ClientMixin, ListView):
    template_name = 'clienttemplates/clientfaq.html'
    queryset = Faq.objects.all()
    context_object_name = "allfaqs"

    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recentblogs'] = Article.objects.order_by("-id")[:5]
        return context
    


class ClientTermsConditionView(ClientMixin, TemplateView):
    template_name = 'clienttemplates/clientternsandcondtions.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recentblogs'] = Article.objects.order_by("-id")[:5]
        context['pages'] = Page.objects.order_by("position")
        return context


class ClientAboutView(ClientMixin, TemplateView):
    template_name = 'clienttemplates/clientabout.html'


class ClientBlogView(ClientMixin, ListView):
    template_name = 'clienttemplates/clientblog.html'
    queryset = Article.objects.all().order_by('-id')
    context_object_name = "allblogs"
    paginate_by = 6


class ClientBlogDetailView(ClientMixin, DetailView):
    template_name = 'clienttemplates/clientblog-details.html'
    model = Article
    context_object_name = 'blog'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        prev_blog = Article.objects.filter(
            id__lt=self.object.id).order_by("-id").first()
        next_blog = Article.objects.filter(
            id__gt=self.object.id).order_by("id").first()
        context['prev'] = prev_blog
        context['next'] = next_blog
        context['recentblogs'] = Article.objects.order_by("-id")[:7]
        return context


class ClientPrivacyPolicyView(ClientMixin, TemplateView):
    template_name = 'clienttemplates/clientprivacypolicy.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recentblogs'] = Article.objects.order_by("-id")[:5]
        context['pages'] = Page.objects.order_by("position")
        return context


class ClientGalleryView(ClientMixin, ListView):
    template_name = 'clienttemplates/clientgallery.html'
    queryset = Album.objects.order_by("-id")
    context_object_name = "gallery"


class ClientGalleryDetailView(ClientMixin, DetailView):
    template_name = 'clienttemplates/clientgallerydetail.html'
    model = Album
    context_object_name = "album"


class ClientTourView(ClientMixin, ListView):
    template_name = 'clienttemplates/clienttourlist.html'
    queryset = Package.objects.all().order_by('-id')
    context_object_name = 'alltour'
    paginate_by = 6


class ClientTourDetailView(ClientMixin, DetailView):
    template_name = 'clienttemplates/clienttourdetail.html'
    model = Package
    context_object_name = 'package'

    def post(self, request, *args, **kwargs):
        form = PackageInquiryForm(request.POST)

        package = Package.objects.get(id=kwargs['pk'])
        if form.is_valid():
            print("hello")
            name = request.POST['name']
            mobile = request.POST['mobile']
            email = request.POST['email']
            message = request.POST['message']
            PackageInquiry.objects.create(package=package, name=name, mobile=mobile, email=email,
                                          message=message)
        else:
            print(form.errors)

        return redirect(reverse('tntapp:clienttourdetail', kwargs={"pk": package.id}))


class ClientPageDetailView(ClientMixin, DetailView):
    template_name = "clienttemplates/clientpagedetail.html"
    model = Page
    context_object_name = "page"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pages'] = Page.objects.exclude(id=self.object.id)
        context['recentblogs'] = Article.objects.order_by("-id")[:5]
        return context
    

class ClientLocationDetailView(ClientMixin, DetailView):
    template_name = "clienttemplates/clientlocationdetail.html"
    model = Location
    context_object_name = "location"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = Paginator(self.object.package_set.all().order_by("-id"), 5)
        page_number = self.request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context['page_obj'] = page_obj
        context['paginator'] = paginator
        return context


class ClientSuscribeView(View):

    def post(self, request, *args, **kwargs):
        email = request.POST.get("email")
        if Subscribe.objects.filter(email=email).exists():
            status = "error"
            message = "Email already exists in subscriber list"
        else:
            Subscribe.objects.create(email=email)
            status = "success"
            message = "Subscribed successfully."
            send_mail(
                "Subscribing Message",
                "Thank you for subscribing us!!!",
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        return JsonResponse({'status': status, 'message': message})


class ClientPackageCategoryDetailView(ClientMixin, DetailView):
    template_name = 'clienttemplates/clientpackagecategorydetail.html'
    queryset = PackageCategory.objects.all()
    context_object_name = 'packagecategory'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pcd'] = Package.objects.filter(category=self.object)
        return context


class ClientSearchView(ClientMixin, TemplateView):
    template_name = 'clienttemplates/clientsearch.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        kw = self.request.GET.get('q', None)
        ds = self.request.GET.get('destination', None)
        ca = self.request.GET.get('category', None)
        if kw is not None and ds is not None and ca is not None:
            
            context["results"] = Package.objects.filter(
                Q(title__icontains=kw) &
                Q(category__title__icontains=ca) &
                Q(destination__icontains=ds)
                 
                    )
        elif ds is not None and ca is not None:
            context["results"] = Package.objects.filter(
                Q(destination__icontains=ds)&(Q(category__title__icontains=ca))
            
            )
        elif kw is not None and ds is not None:
            context["results"] = Package.objects.filter(
                Q(destination__icontains=ds)&
                Q(category__title__icontains=kw)&
                Q(destination__icontains=kw)
            
            )
        elif kw is not None and ca is not None:
            context["results"] = Package.objects.filter(
                Q(destination__icontains=ds)&
                Q(category__title__icontains=kw)&
                Q(category__title__icontains=ca)&
                Q(destination__icontains=kw)
            
            )
        else: 
            context["results"]=Package.objects.filter(
                Q (category__title__icontains=kw) |
                Q (title__icontains=kw) |
                Q (description__icontains=kw) |
                Q (destination__icontains=kw) 

                )


        return context
