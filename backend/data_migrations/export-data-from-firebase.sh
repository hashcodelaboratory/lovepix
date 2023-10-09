#!/bin/bash

firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/admins.json --nodePath admins --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/categories.json --nodePath categories --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/categories-eshop.json --nodePath categories-eshop --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/contents.json --nodePath contents --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/dimensions.json --nodePath dimensions --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/gallery.json --nodePath gallery --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/materials.json --nodePath materials --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/products.json --nodePath products --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/reviews.json --nodePath reviews --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/translations.json --nodePath translations --prettyPrint
firestore-export --accountCredentials firebase-key-lovepix-test.json --backupFile backup_data_firebase/vouchers.json --nodePath vouchers --prettyPrint

python3 output.py

sudo docker cp backup_data_firebase/new_format_data mongo1:/

# docker exec -it mongo1 /bin/bash
# sudo su -c "docker exec -it mongo1 /bin/bash"

# mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix -c Admins admins.json

docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection admins --file new_format_data/admins.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection categories --file new_format_data/categories.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection categories-eshop --file new_format_data/categories-eshop.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection contents --file new_format_data/contents.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection dimensions --file new_format_data/dimensions.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection gallery --file new_format_data/gallery.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection materials --file new_format_data/materials.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection products --file new_format_data/products.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection reviews --file new_format_data/reviews.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection translations --file new_format_data/translations.json"
docker exec mongo1 /bin/sh -c "mongoimport --username KO3tsFVctORJLYY --password Gsk0UXNzMWs2xWoEzxhY --authenticationDatabase admin --db lovepix --port 27591 --collection vouchers --file new_format_data/vouchers.json"