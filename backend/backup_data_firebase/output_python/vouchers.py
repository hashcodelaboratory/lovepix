import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # vouchers.json 

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/vouchers.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/vouchers.json", "r") as f:   
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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to vouchers")

process_json(file_path)