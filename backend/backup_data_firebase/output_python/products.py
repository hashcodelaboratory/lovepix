import json
import re

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # products.json

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/products.json", "r") as f:    
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
    with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/products.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/products.json", "r") as g:    
    output_vouchers = json.load(g)

output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")
false_word= new_string.replace("False", "false")
true_word= false_word.replace("True", "true")

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/products.json", 'w') as h:
    h.write(true_word)