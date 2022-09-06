import styles from './dashboard.module.scss'
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import DashboardContext from './context/dashboard-context';
import {useEffect, useState} from "react";
import {listAll, ref, StorageReference} from "@firebase/storage";
import {storage} from "../../../utils/firebase/config";
import {UPLOAD_IMAGES} from "../home/components/upload-image/dropzone/utils";

const CustomDashboard = () => {
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
        // no additional dependencies needed
    }, []);

    return (
        <DashboardContext.Provider value={{
            state: {
                uploadedImages
            }
        }}>
            <div className={styles.dashboardContainer}>
                <Sidebar/>
                <Content/>
            </div>
        </DashboardContext.Provider>
    )
}

export default CustomDashboard