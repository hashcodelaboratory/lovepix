import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # materials.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/materials.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/materials.json", "r") as f:    
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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to materials")

process_json(file_path)