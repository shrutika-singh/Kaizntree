1. Run the following commands to install Django:
    pip install django djangorestframework


2. From the kaizntree_backend folder , run this commands
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
The application will be available at http://127.0.0.1:8000/


3. Create a username and Password in DB by running the following command from terminal in the kaizntree_backend folder:
    from django.contrib.auth.models import User
    user = User.objects.create_user('myusername', password='mypassword')
Use this UserName and Password while logging into the application through browser or hitting the auth-token api

4. Create some entries in the DB before accessing the /items api:

# Start by running this command in your terminal to enter the Django shell
python manage.py shell

# Then, in the Django shell, execute these commands:
from dashboards.models import Item, Category, Tag

# Create categories
category_names = ["Bundles", "Raw Materials", "Finished Products"]
categories = {name: Category.objects.get_or_create(name=name)[0] for name in category_names}

# Create tags
tag_names = ["Etsy", "settings", "dollars", "cart", "tools", "shop", "zero"]
tags = {name: Tag.objects.get_or_create(name=name)[0] for name in tag_names}

# Function to create a new item with associated tags and category
def create_item(sku, name, category_name, stock_status, available_stock, tag_list,in_stock):
    item = Item(
        SKU=sku, 
        name=name, 
        category=categories[category_name], 
        stock_status=stock_status, 
        available_stock=available_stock,
        in_stock=in_stock
    )
    item.save()  # Save the item to instantiate it before adding many-to-many relations
    for tag_name in tag_list:
        item.tags.add(tags[tag_name])
    return item


# Use the function to create a new item
new_item = create_item(
    sku="OCNCOT", 
    name="Cotton-Ocean Print", 
    category_name="Raw Materials", 
    stock_status="out_of_stock", 
    available_stock=300, 
    tag_list=["zero", "settings","cart"],
    in_stock = 500,
)


 




