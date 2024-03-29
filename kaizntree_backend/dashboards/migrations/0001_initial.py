# Generated by Django 4.2.10 on 2024-02-11 04:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Item",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("SKU", models.CharField(max_length=100, unique=True)),
                ("name", models.CharField(max_length=255)),
                (
                    "stock_status",
                    models.CharField(
                        choices=[
                            ("in_stock", "In Stock"),
                            ("out_of_stock", "Out of Stock"),
                            ("low_stock", "Low Stock"),
                        ],
                        max_length=12,
                    ),
                ),
                ("available_stock", models.PositiveIntegerField()),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="items",
                        to="dashboards.category",
                    ),
                ),
                ("tags", models.ManyToManyField(blank=True, to="dashboards.tag")),
            ],
        ),
    ]
