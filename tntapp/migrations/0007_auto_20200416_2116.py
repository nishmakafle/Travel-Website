# Generated by Django 3.0.5 on 2020-04-16 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tntapp', '0006_auto_20200416_1642'),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
                ('menu', models.CharField(choices=[('Company Info', 'Company Info')], max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='pages')),
                ('description', models.TextField()),
                ('position', models.PositiveIntegerField()),
            ],
            options={
                'unique_together': {('menu', 'position')},
            },
        ),
        migrations.AddField(
            model_name='package',
            name='locations',
            field=models.ManyToManyField(to='tntapp.Location'),
        ),
    ]
