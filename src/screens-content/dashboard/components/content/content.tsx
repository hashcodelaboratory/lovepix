import Card from "./components/home/card";
import styles from '../../dashboard.module.scss'
import {messages} from "../../../../messages/messages";
import Table from "./components/home/table";
import {storage} from "../../../../../utils/firebase/config";
import {UPLOAD_IMAGES} from "../../../home/components/upload-image/dropzone/utils";
import {listAll, ref, StorageReference} from "@firebase/storage";
import {useEffect, useState} from "react";

const Content = () => {
    const [uploadedImages, setUploadedImages] = useState<StorageReference[]>([]);

    const uploadedImagesRef = ref(storage, UPLOAD_IMAGES);

    useEffect(() => {
        listAll(uploadedImagesRef)
            .then(res => {
                setUploadedImages(res.items);
            })
            .catch(error => {
                console.log(error);
            });
    }, [uploadedImagesRef]);

    return (
        <div className={styles.contentContainer}>
            <div className={styles.cardRow}>
                <Card
                    header={{
                        title: messages.orders,
                        count: 258
                    }}
                    footer={{
                        value: '+ 55 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.products,
                        count: 12456
                    }}
                    footer={{
                        value: '+ 15 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.uploadedImages,
                        count: uploadedImages.length
                    }}
                    footer={{
                        value: '+ 15 %',
                        text: messages.thanLastWeek
                    }}
                />
            </div>
            <Table/>
        </div>
    )
}

export default Content