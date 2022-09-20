import {useQuery, UseQueryResult} from "react-query";
import {listAll, ref, StorageReference} from "@firebase/storage";
import {storage} from "../../../../utils/firebase/config";
import {UPLOAD_IMAGES} from "../../home/components/upload-image/dropzone/utils";

export const UPLOADED_IMAGES_KEY = 'UPLOADED_IMAGES';

const getUploadedImages = async (): Promise<StorageReference[]> => {
    const uploadedImagesRef = ref(storage, UPLOAD_IMAGES);

    const { items } = await listAll(uploadedImagesRef);

    return items;
}

export const useUploadedImages = (): UseQueryResult<StorageReference[]> =>
    useQuery([UPLOADED_IMAGES_KEY], () => getUploadedImages());