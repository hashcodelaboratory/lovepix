import {useQuery, UseQueryResult} from "react-query";
import {listAll, ref, StorageReference} from "@firebase/storage";
import {storage} from "../../../common/firebase/config";
import {UPLOAD_IMAGES} from "../../home/components/upload-image/dropzone/utils";

export const UPLOADED_IMAGES_KEY = 'UPLOADED_IMAGES';

const getUploadedImages = async (): Promise<StorageReference[]> => {
    const uploadedImagesRef = ref(storage, UPLOAD_IMAGES);

    const { prefixes } = await listAll(uploadedImagesRef);

    return prefixes;
}

export const useUploadedImages = (): UseQueryResult<StorageReference[]> =>
    useQuery([UPLOADED_IMAGES_KEY], () => getUploadedImages());