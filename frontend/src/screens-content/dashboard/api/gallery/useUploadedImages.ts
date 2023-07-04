import { useQuery, UseQueryResult } from "react-query";
import { listAll,  ref, StorageReference } from "@firebase/storage";
import { storage } from "../../../../common/firebase/config";
import { StorageFolder } from "../../../../common/firebase/storage/enums";

export const UPLOADED_IMAGES_KEY = "UPLOADED_IMAGES";

const getUploadedImages = async (): Promise<StorageReference[]> => {
  const uploadedImagesRef = ref(storage, StorageFolder.GALLERY);

  const { items } = await listAll(uploadedImagesRef);

  return items;
};

export const useUploadedImages = (): UseQueryResult<StorageReference[]> =>
  useQuery([UPLOADED_IMAGES_KEY], () => getUploadedImages());
