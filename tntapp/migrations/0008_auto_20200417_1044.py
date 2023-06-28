# Generated by Django 3.0.5 on 2020-04-17 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tntapp', '0007_auto_20200416_2116'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizationalinformation',
            name='profile_video',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='page',
            name='menu',
            field=models.CharField(choices=[('Company', 'Company'), ('Others', 'Others')], max_length=50),
        ),
    ]
