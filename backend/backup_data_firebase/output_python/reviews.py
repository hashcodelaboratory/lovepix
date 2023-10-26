import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # reviews.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/reviews.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/reviews.json", "r") as f:    
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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to reviews")

process_json(file_path)