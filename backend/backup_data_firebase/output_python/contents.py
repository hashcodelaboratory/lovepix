import json
import re
from functions import process_json

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # contents.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/contents.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/contents.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "pageId": value["pageId"],
        "content": value["content"]
    }
    output.append(item)

for item in output:
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to contents")

process_json(file_path)