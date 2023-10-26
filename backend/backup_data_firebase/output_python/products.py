import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # products.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/products.json"

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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to products")

process_json(file_path)