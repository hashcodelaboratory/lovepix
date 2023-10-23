#!/bin/bash

firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/categories-eshop.json --nodePath categories-eshop --prettyPrint

python3 categories-eshop.py

sudo docker cp /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data mongo1:/

docker exec mongo1 /bin/sh -c "mongoimport --username $MONGODB_ADMINUSERNAME --password $MONGODB_PASSWORD --authenticationDatabase admin --db lovepix --port 27591 --collection GalleryCategory --drop --file new_format_data/categories-eshop.json"