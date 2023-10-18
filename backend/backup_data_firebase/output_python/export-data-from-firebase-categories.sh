#!/bin/bash

firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/categories.json --nodePath categories --prettyPrint

python3 categories.py

sudo docker cp /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data mongo1:/

docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection Category --drop --file new_format_data/categories.json"