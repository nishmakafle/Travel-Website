# Generated by Django 3.0.5 on 2020-04-15 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tntapp', '0003_faq'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizationalinformation',
            name='office_time',
            field=models.CharField(blank=True, default='Office Hour 10:00 to 6:00', max_length=200, null=True),
        ),
    ]
