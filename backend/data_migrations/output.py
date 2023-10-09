import json
import re

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # vouchers.json 

with open("backup_data_firebase/vouchers.json", "r") as f:   
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "code": value["code"],
        "saleType": value["saleType"],
        "freeDelivery": value["freeDelivery"],
        "description": value["description"],
        "expiration": value["expiration"],
        "value": value["value"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/vouchers.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/vouchers.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")

with open("backup_data_firebase/new_format_data/vouchers.json", 'w') as h:
    h.write(true_word)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # admins.json 

with open("backup_data_firebase/admins.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "email": value["email"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/admins.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/admins.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/admins.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # categories-eshop.json 

with open("backup_data_firebase/categories-eshop.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "title": value["name"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/categories-eshop.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/categories-eshop.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/categories-eshop.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # categories.json

with open("backup_data_firebase/categories.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "title": value["name"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/categories.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/categories.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/categories.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # contents.json

with open("backup_data_firebase/contents.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "pageId": value["pageId"],
        "content": value["content"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/contents.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/contents.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/contents.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # dimensions.json

with open("backup_data_firebase/dimensions.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "title": value["name"],
        # "galleryIds": value["galleryIds"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/dimensions.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/dimensions.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/dimensions.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # gallery.json

with open("backup_data_firebase/gallery.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "bucket": value["bucket"],
        "fullPath": value["fullPath"],
        "price": value["price"],
        "size": value["size"],
        "url": value["url"],
        "name": value["name"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/gallery.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/gallery.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("backup_data_firebase/new_format_data/gallery.json", 'w') as h:
    h.write(new_string)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # materials.json

with open("backup_data_firebase/materials.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "description": value["description"],
        "subtitle": value["subtitle"],
        "title": value["title"],
        "id": value["id"],
        "availability": value["availability"],
        "image": value["image"],
        "type": value["type"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/materials.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/materials.json", "r") as g:    
    output_vouchers = json.load(g)

output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")

with open("backup_data_firebase/new_format_data/materials.json", 'w') as h:
    h.write(true_word)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # products.json

with open("backup_data_firebase/products.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "image": value["image"],
        "path": value["path"],
        "price": value["price"],
        "count": value["count"],
        "description": value["description"],
        "category": value["category"],
        "name": value["title"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/products.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/products.json", "r") as g:    
    output_vouchers = json.load(g)

output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")

with open("backup_data_firebase/new_format_data/products.json", 'w') as h:
    h.write(true_word)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # reviews.json

with open("backup_data_firebase/reviews.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "date": value["date"],
        "review": value["review"],
        "name": value["name"],
        "rating": value["rating"],
        "email": value["email"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/reviews.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/reviews.json", "r") as g:    
    output_vouchers = json.load(g)

output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")
null_word= true_word.replace("None", "null")

with open("backup_data_firebase/new_format_data/reviews.json", 'w') as h:
    h.write(null_word)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # translations.json

with open("backup_data_firebase/translations.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "materialsCanvasSubTitle": value["materialsCanvasSubTitle"],
        "materialsAcrylDescription": value["materialsAcrylDescription"],
        "materialsCanvasTitle": value["materialsCanvasTitle"],
        "materialsAcrylSubTitle": value["materialsAcrylSubTitle"],
        "materialsAluminiumSubTitle": value["materialsAluminiumSubTitle"],
        
        "materialsCanvasDescription": value["materialsCanvasDescription"],
        "materialsAcrylTitle": value["materialsAcrylTitle"],
        "materialsAluminiumDescription": value["materialsAluminiumDescription"],
        "materialsAluminiumTitle": value["materialsAluminiumTitle"],
        "partnersOneTitle": value["partnersOneTitle"],

        "partnersOneSubtitle": value["partnersOneSubtitle"],
        "partnersOneDescription": value["partnersOneDescription"],
        "partnersTwoTitle": value["partnersTwoTitle"],
        "partnersTwoSubtitle": value["partnersTwoSubtitle"],
        "partnersTwoDescription": value["partnersTwoDescription"],

        "partnersDetails": value["partnersDetails"],
        "partnersForm": value["partnersForm"]
    }
    output.append(item)

for item in output:
    with open("backup_data_firebase/new_format_data/translations.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("backup_data_firebase/new_format_data/translations.json", "r") as g:    
    output_vouchers = json.load(g)

output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")

with open("backup_data_firebase/new_format_data/translations.json", 'w') as h:
    h.write(true_word)