import json
import re

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # admins.json 

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/admins.json", "r") as f:    
    keys = json.load(f)

output = []

for key, value in keys.items():
    item = {
        "email": value["email"]
    }
    output.append(item)

for item in output:
    with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/admins.json", "w") as output_file:
        json.dump(output, output_file, indent=2)

print("Data has been written to")

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/admins.json", "r") as g:    
    output_vouchers = json.load(g)


output_string=str(output_vouchers)
print(output_string)

json_data = re.sub(r'^\[|\]$', '', output_string)

final_output = json_data.replace('}, {', '}{')
new_string = final_output.replace("'", "\"")

with open("/home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data/admins.json", 'w') as h:
    h.write(new_string)