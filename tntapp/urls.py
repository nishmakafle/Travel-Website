from django.urls import path, re_path
from .views import *


app_name = "tntapp"

urlpatterns = [
    # Under Construction
#     path('', UnderConstructionView.as_view(), name="underconstruction"),

    path('admin-login/', AdminLoginView.as_view(), name='adminlogin'),
    path('logout/', AdminLogoutView.as_view(), name='logout'),

    # Admin Urls
    path('tour-admin/', AdminOrganizationView.as_view(), name='adminhome'),
    path('tour-admin/', AdminOrganizationView.as_view(),
         name='adminorganization'),
    path("admin/organization/<int:pk>/update/",
         AdminOrganizationUpdateView.as_view(), name="adminorganizationupdate"),

         # Service Urls

    path('tour-admin/service/create/', AdminServiceCreateView.as_view(), name='adminservicecreate'),
    path('tour-admin/services/',AdminServiceListView.as_view(), name='adminservicelist'),
    path('tour-admin/service/<int:pk>/update/', AdminServiceUpdateView.as_view(), name = 'adminserviceupdate'),
    path('tour-admin/service/<int:pk>/delete/', AdminServiceDeleteView.as_view(), name='adminservicedelete'),

        # Package-Category Urls

    path('tour-admin/packagecategory/list/',
         AdminPackageCategoryListView.as_view(), name="adminpackagecategorylist"),
    path('tour-admin/packagecategory/create/',
         AdminPackageCategoryCreateView.as_view(), name="adminpackagecategorycreate"),
    path('tour-admin/<int:pk>/packagecategory-edit/',
         AdminPackageCategoryUpdateView.as_view(), name="adminpackagecategoryupdate"),
    path('tour-admin/<int:pk>/packagecategory-delete/',
         AdminPackageCategoryDeleteView.as_view(), name="adminpackagecategorydelete"),

         # Package-Feature Urls
    
    path('tour-admin/packagefeature/list/',
         AdminPackageFeatureListView.as_view(), name="adminpackagefeaturelist"),
    path('tour-admin/packagefeature/create/',
         AdminPackageFeatureCreateView.as_view(), name="adminpackagefeaturecreate"),
    path('tour-admin/<int:pk>/packagefeatureedit/',
         AdminPackageFeatureUpdateView.as_view(), name="adminpackagefeatureupdate"),
    path('tour-admin/<int:pk>/packagefeaturedelete/',
         AdminPackageFeatureDeleteView.as_view(), name="adminpackagefeaturedelete"),
         
         #Location Urls
     path('tour-admin/location/create/',AdminLocationCreateView.as_view(), name='adminlocationcreate'),
     path('tour-admin/location/list/',AdminLocationListView.as_view(), name='adminlocationlist'), 
     path('tour-admin/location/<int:pk>/update/', AdminLocationUpdateView.as_view(), name='adminlocationupdate'),
     path('tour-admin/location/<int:pk>/delete/', AdminLocationDeleteView.as_view(), name='adminlocationdelete'),

         # Package Urls
    
    path('tour-admin/package/list/', AdminPackageListView.as_view(),
         name="adminpackagelist"),
    path('tour-admin/package/create/', AdminPackageCreateView.as_view(),
         name="adminpackagecreate"),
    path('tour-admin/<int:pk>/packageedit/',
         AdminPackageUpdateView.as_view(), name="adminpackageupdate"),
    path('tour-admin/<int:pk>/packagedelete/',
         AdminPackageDeleteView.as_view(), name="adminpackagedelete"),

     # Pages Urls
     path('tour-admin/page/create/', AdminPageCreateView.as_view(),name='adminpagecreate'),
     path('tour-admin/page/list/', AdminPageListView.as_view(), name='adminpagelist'),
     path('tour-admin/page/<int:pk>/update/', AdminPageUpdateView.as_view(), name='adminpageupdate'),
     path('tour-admin/page/<int:pk>/delete/', AdminPageDeleteView.as_view(), name = 'adminpagedelete'),
        # Article Urls

    path('tour-admin/article/list/', AdminArticleListView.as_view(),
         name="adminarticlelist"),
    path('tour-admin/article/create/', AdminArticleCreateView.as_view(),
         name="adminarticlecreate"),
    path('tour-admin/<int:pk>/articleedit/',
         AdminArticleUpdateView.as_view(), name="adminarticleupdate"),
    path('tour-admin/<int:pk>/articledelete/',
         AdminArticleDeleteView.as_view(), name="adminarticledelete"),

         # Album Urls

    path('tour-admin/album/list/', AdminAlbumListView.as_view(), name="adminalbumlist"),
    path('tour-admin/album/create/', AdminAlbumCreateView.as_view(),
         name="adminalbumcreate"),
    path('tour-admin/<int:pk>/albumedit/',
         AdminAlbumUpdateView.as_view(), name="adminalbumupdate"),
    path('tour-admin/<int:pk>/albumdelete/',
         AdminAlbumDeleteView.as_view(), name="adminalbumdelete"),
     path("admin/ajax/img-del-<int:pk>/", AjaxImageDelete.as_view(), name="ajaximgdel"),

     # Message Urls
     path('tour-admin/message/list/', AdminMessageListView.as_view(),
         name="adminmessagelist"),
     path('tour-admin/message/<int:pk>/detail/', AdminMessageDetailView.as_view(),
          name="adminmessagedetail"),
    path('tour-admin/<int:pk>/messagedelete/',
         AdminMessageDeleteView.as_view(), name="adminmessagedelete"),

     # PackageInquery Urls
     path('tour-admin/packageinquiry/list/', AdminPackageInquiryListView.as_view(),
           name='adminpackageinquirylist'),
     path('tour-admin/packageinquiry/<int:pk>/detail/',
          AdminPackageInquiryDetailView.as_view(), name="adminpackageinquerydetail"),
     path('tour-admin/packageinquiry/<int:pk>/delete/', 
          AdminPackageInquiryDeleteView.as_view(),name="adminpackageinquerydelete"),

     #HappyCustomer Urls
     path('tour-admin/happycustomer/list/', AdminHappyCustomerListView.as_view(),
         name="adminhappycustomerlist"),
     path('tour-admin/<int:pk>/happycustomerdelete/',
         AdminHappyCustomerDeleteView.as_view(), name="adminhappycustomerdelete"),
     path('tour-admin/<int:pk>/happycustomeredit/',
         AdminHappyCustomerUpdateView.as_view(), name="adminhappycustomerupdate"),
     path('tour-admin/happycustomer/create/',
         AdminHappyCustomerCreateView.as_view(), name="adminhappycustomercreate"),
     
     # Slider Urls
     path('tour-admin/slider/list/', AdminSliderListView.as_view(), name="adminsliderlist"),
     path('tour-admin/slider/create/', AdminSliderCreateView.as_view(),
         name="adminslidercreate"),
     path('tour-admin/<int:pk>/slideredit/',
         AdminSliderUpdateView.as_view(), name="adminsliderupdate"),
     path('tour-admin/<int:pk>/sliderdelete/',
         AdminSliderDeleteView.as_view(), name="adminsliderdelete"),

     # Subscribe Urls
     path('tour-admin/subscribe/list/', AdminSubscribeListView.as_view(),
         name="adminsubscribelist"),
    path('tour-admin/<int:pk>/subscribedelete/',
         AdminSubscribeDeleteView.as_view(), name="adminsubscribedelete"),
     # Faqs Urls
     path('tour-admin/faq/create/',AdminFaqCreateView.as_view(), name='adminfaqcreate'),
     path('tour-admin/faq/list/', AdminFaqListView.as_view(), name='adminfaqlist'),
     path('tour-admin/faq/<int:pk>/update/',AdminFaqUpdateView.as_view(),name='adminfaqupdate'),
     path('tour-admin/faq/<int:pk>/delete/', AdminFaqDeleteView.as_view(), name='adminfaqdelete'),

     # Client Urls
     path('', ClientHomeView.as_view(), name='clienthome'),
     # path('about/', ClientAboutView.as_view(), name='clientabout'),
     path('blog/', ClientBlogView.as_view(), name='clientblog'),
     path('blog/<int:pk>/details/',ClientBlogDetailView.as_view(), name='clientblogdetail'),
     path('contact/', ClientContactView.as_view(), name="clientcontact"),
     path('faq/', ClientFaqView.as_view(), name = 'clientfaq'),
     path('search/', ClientSearchView.as_view(), name ='clientsearch'),
     path('terms-condition/' ,ClientTermsConditionView.as_view(), name='clienttermscondition'),
     path('privacy-policy/', ClientPrivacyPolicyView.as_view(), name='clientprivacypolicy'),
     path('gallery/', ClientGalleryView.as_view(), name='clientgallery'),
     path('gallery/<int:pk>/detail/', ClientGalleryDetailView.as_view(), name='clientgallerydetail'),
     path('all-packages/', ClientTourView.as_view(),name='clienttourlist'),
     path('package/<int:pk>/detail/',ClientTourDetailView.as_view(), name='clienttourdetail'),
     path('activity/<str:title>-<int:pk>/', ClientPackageCategoryDetailView.as_view(), name='packagecategorydetail'),
     path("<slug:slug>-p/", ClientPageDetailView.as_view(), name="clientpagedetail"),
     path("destination/<slug:slug>/", ClientLocationDetailView.as_view(), name="clientlocationdetail"),


     path('subscribe/',ClientSuscribeView.as_view(), name='subscribe'),
     



]
