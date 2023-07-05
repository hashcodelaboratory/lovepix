import { ref, deleteObject } from "@firebase/storage";
import { database, storage } from "../../../../common/firebase/config";
import { StorageFolder } from "../../../../common/firebase/storage/enums";
import { collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
import { Collections } from "../../../../common/firebase/enums";

export const removeUploadedImages = (
  selectedRows: string[],
): string => {
  selectedRows.forEach(async (row) => {
    await deleteObject(ref(storage, `${StorageFolder.GALLERY}/${row}`));
    const q = query(collection(database, Collections.GALLERY), where("fullPath", "==", `${StorageFolder.GALLERY}/${row}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (_doc) => {
      await deleteDoc(doc(database, Collections.GALLERY, _doc.id ));
    });
  });
  return "";
};
