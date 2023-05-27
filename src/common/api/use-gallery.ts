import { useQuery, UseQueryResult } from "react-query";
import { GalleryItem } from "../types/gallery";
import { collection, getDocs } from "@firebase/firestore";
import { database } from "../firebase/config";
import { Collections } from "../firebase/enums";

export const GALLERY_KEY = "GALLERY";

const getGallery = async (): Promise<GalleryItem[]> => {
  const querySnapshot = await getDocs(collection(database, Collections.GALLERY));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as GalleryItem),
  );
};

export const useGallery = (): UseQueryResult<GalleryItem[]> =>
  useQuery([GALLERY_KEY], () => getGallery());