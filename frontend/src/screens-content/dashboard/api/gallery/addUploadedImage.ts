import { FullMetadata, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { doc, setDoc } from "@firebase/firestore";
import { database, storage } from "../../../../common/firebase/config";
import { Collections } from "../../../../common/firebase/enums";
import { StorageFolder } from "../../../../common/firebase/storage/enums";

export type UploadImageType = {
  bucket: string;
  contentType: string;
  fullPath: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;
  url: string;
  price: number;
  dimensions: string[];
  categories: string[];
}

export const uploadToFirestore = async (metadata: FullMetadata, url: string, cat: string[], dim: string[]) => {
  const { bucket, contentType, fullPath, name, size, timeCreated, updated } = metadata;
  const docData = {
    bucket: bucket,
    contentType: contentType,
    fullPath: fullPath,
    name: name,
    size: size,
    timeCreated: timeCreated,
    updated: updated,
    url: url,
    categories: dim,
    dimensions: cat,
    price: 0,
  } as UploadImageType;
  await setDoc(doc(database, Collections.GALLERY, `IMG-${Date.now()}`),
    docData);
};

export const uploadToStorage = async (file: File) => {
  const _name = `${StorageFolder.GALLERY}/${file.name}`;
  const imageRef = ref(storage, _name);
  const { metadata } = await uploadBytes(imageRef, file);
  if (metadata) {
    const url = await getDownloadURL(ref(storage, _name));
    return ({
      url: url,
      metadata: metadata
    })
  }
};