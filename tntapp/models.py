from django.db import models


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class OrganizationalInformation(TimeStamp):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="organization")
    profile_image = models.ImageField(upload_to="organization")
    profile_video = models.CharField(max_length=200, null=True, blank=True)
    vat_pan = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=500)
    slogan = models.CharField(max_length=500, null=True, blank=True)
    contact_no = models.CharField(max_length=200)
    alt_contact_no = models.CharField(max_length=200, null=True, blank=True)
    office_time = models.CharField(max_length=200, default="Office Hour 10:00 to 6:00", null=True, blank=True)
    map_location = models.CharField(max_length=200)
    email = models.EmailField()
    alt_email = models.EmailField(null=True, blank=True)
    about_us = models.TextField()

    facebook = models.CharField(max_length=200)
    instagram = models.CharField(max_length=200, null=True, blank=True)
    twitter = models.CharField(max_length=200, null=True, blank=True)
    youtube = models.CharField(max_length=200, null=True, blank=True)
    whatsapp = models.CharField(max_length=200, null=True, blank=True)
    viber = models.CharField(max_length=200, null=True, blank=True)
    terms_and_conditions = models.TextField(null=True, blank=True)
    privacy_policy = models.TextField(null=True, blank=True)
    # cookies_policy = models.TextField(null=True, blank=True)
    show_popup = models.BooleanField(default=False)
    popup_image = models.ImageField(
        upload_to="organization", null=True, blank=True)

    messenger_script = models.TextField(null=True, blank=True)
    google_analytics_script = models.TextField(null=True, blank=True)
    background_image = models.ImageField(
        upload_to="organization", null=True, blank=True)

    @property
    def vthumb(self):
        if self.profile_video:
            return self.profile_video.split("=")[-1]
        else:
            return "no video"

    def __str__(self):
        return self.name



class Slider(TimeStamp):
    title = models.CharField(max_length=200)
    caption = models.CharField(max_length=500, null=True, blank=True)
    image = models.ImageField(upload_to="sliders")

    def __str__(self):
        return self.title


PAGE_MENU = (
    ("Company", "Company"),
    ("Others", "Others"),
)

class Page(TimeStamp):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, null=True, blank=True)
    menu = models.CharField(max_length=50, choices=PAGE_MENU)
    image = models.ImageField(upload_to="pages", null=True, blank=True)
    description = models.TextField()
    position = models.PositiveIntegerField()

    class Meta:
        unique_together = (('menu', 'position'),)
    
    def __str__(self):
        return self.title

class Service(TimeStamp):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="services")
    description = models.TextField()

    def __str__(self):
        return self.title


PACKAGE_TYPE = (
    ("Inbound Tour", "Inbound Tour"),
    ("Int'l Tour", "Int'l Tour"),
)


class PackageCategory(TimeStamp):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="categories")
    description = models.TextField()

    def __str__(self):
        return self.title


class PackageFeature(TimeStamp):
    title = models.CharField(max_length=50)
    short_intro = models.CharField(max_length=150)
    icon = models.ImageField(upload_to="features")

    def __str__(self):
        return self.title


class Location(TimeStamp):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.name

class Package(TimeStamp):
    title = models.CharField(max_length=300)
    category = models.ForeignKey(
        PackageCategory, on_delete=models.SET_NULL, null=True, blank=True)
    feature = models.ManyToManyField(PackageFeature)
    package_type = models.CharField(max_length=50, choices=PACKAGE_TYPE)
    image = models.ImageField(upload_to="packages")
    video = models.CharField(max_length=200,null=True, blank=True)
    destination = models.CharField(max_length=200, null=True)
    duration = models.CharField(max_length=200)
    description = models.TextField()
    price = models.IntegerField(null=True, blank=True)
    locations = models.ManyToManyField(Location)
    is_featured = models.BooleanField(default=False, null=True, blank=True)

    @property
    def vthumb(self):
        if self.video:
            return self.video.split("=")[-1]
        else:
            return "no video"

    def __str__(self):
        return self.title

class PackageImage(TimeStamp):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    image =models.ImageField(upload_to="packageimages")

    def __str__(self):
        return self.package.title

class PackageInquiry(TimeStamp):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    email = models.EmailField(null=True, blank=True)
    message = models.TextField()

    def __str__(self):
        return self.name



class Article(TimeStamp):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="articles")
    content = models.TextField()
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title + "(id: " + str(self.id) +")"


STARS = (
    (1, "One Star"),
    (2, "Two Star"),
    (3, "Three Star"),
    (4, "Four Star"),
    (5, "Five Star"),
)

class HappyCustomer(TimeStamp):
    name = models.CharField(max_length=200)
    stars = models.PositiveIntegerField(choices=STARS, default=5)
    image = models.ImageField(upload_to="testimonials")
    quote = models.TextField()
    current_engagement = models.CharField(
        max_length=100, null=True, blank=True)

    @property
    def starss(self):
        return [n for n in range(self.stars)]
    
    @property
    def nstarss(self):
        return [n for n in range(5-self.stars)]

    def __str__(self):
        return self.name


class Message(TimeStamp):
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=50)
    email = models.EmailField(null=True, blank=True)
    subject = models.CharField(max_length=200, null=True, blank=True)
    message = models.TextField()

    def __str__(self):
        return self.name


class Album(TimeStamp):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class Image(TimeStamp):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gallery")
    caption = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.album.title


class Subscribe(TimeStamp):
    email = models.EmailField()

    def __str__(self):
        return self.email

class Faq(TimeStamp):
    question = models.CharField(max_length=200)
    answer = models.TextField()
    
    def __str__(self):
        return self.question