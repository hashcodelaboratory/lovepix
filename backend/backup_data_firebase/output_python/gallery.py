import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # gallery.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/gallery.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/gallery.json", "r") as f:    
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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to gallery")

process_json(file_path)