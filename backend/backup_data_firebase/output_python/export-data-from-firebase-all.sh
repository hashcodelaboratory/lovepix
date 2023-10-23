#!/bin/bash

firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/admins.json --nodePath admins --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/categories.json --nodePath categories --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/categories-eshop.json --nodePath categories-eshop --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/contents.json --nodePath contents --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/dimensions.json --nodePath dimensions --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/gallery.json --nodePath gallery --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/materials.json --nodePath materials --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/products.json --nodePath products --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/reviews.json --nodePath reviews --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/translations.json --nodePath translations --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/vouchers.json --nodePath vouchers --prettyPrint

python3 admins.py 
python3 categories-eshop.py 
python3 categories.py 
python3 contents.py 
python3 dimensions.py
python3 functions.py
python3 gallery.py
python3 materials.py
python3 products.py
python3 reviews.py
python3 translations.py
python3 vouchers.py

sudo docker cp /home/ec2-user/docker-nginx-letsencrypt-https-ec2/backup_data_firebase/new_format_data mongo1:/

docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection Admins --file new_format_data/admins.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection categories --file new_format_data/categories.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection GalleryCategory --file new_format_data/categories-eshop.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection contents --file new_format_data/contents.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection dimensions --file new_format_data/dimensions.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection gallery --file new_format_data/gallery.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection materials --file new_format_data/materials.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection products --file new_format_data/products.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection reviews --file new_format_data/reviews.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection translations --file new_format_data/translations.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection vouchers --file new_format_data/vouchers.json"

