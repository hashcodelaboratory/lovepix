import json
import re
from functions import process_json
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # translations.json

file_path="/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/translations.json"

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/translations.json", "r") as f:    
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
    with open(file_path, "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to translations")

process_json(file_path)