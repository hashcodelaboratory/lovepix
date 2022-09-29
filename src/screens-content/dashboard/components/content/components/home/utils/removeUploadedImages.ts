import {ref, deleteObject} from "@firebase/storage";
import {storage} from "../../../../../../../../utils/firebase/config";
import {UPLOADED_IMAGES_KEY} from "../../../../../api/uploadedImages";
import {QueryClient} from "react-query";

export const removeUploadedImages = (selectedRows: string[], queryClient: QueryClient): string => {
    selectedRows.forEach(row => {
        const desertRef = ref(storage, row);

        deleteObject(desertRef).then(() => {
            queryClient.invalidateQueries(UPLOADED_IMAGES_KEY);
        }).catch((err) => {
            return err;
        });
    });
    return "";
}