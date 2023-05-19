import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import { FullMetadata, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { database, storage } from "../../../../../../../common/firebase/config";
import { doc, setDoc } from "@firebase/firestore";
import { StorageFolder } from "../../../../../../../common/firebase/storage/enums";
import { Collections } from "../../../../../../../common/firebase/enums";
import { useState } from "react";
import { UPLOADED_IMAGES_KEY } from "../../../../../api/gallery/useUploadedImages";
import { useQueryClient } from "react-query";

type UploadImageType = {
  bucket: string;
  contentType: string;
  fullPath: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;
  url: string;
}

const uploaderOptions = {
  multi: false,

  // Comment out this line & use 'onUpdate' instead of
  // 'onComplete' to have the dropzone close after upload.
  showFinishButton: true,

  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

const UploaderComponent = (): JSX.Element => {
  const queryClient = useQueryClient();

  const [uploader, setUploader] = useState(Uploader({ apiKey: "free" }));

  const onComplete = async (files: any) => {
    await uploadToStorage(files[0].originalFile.file);
  };

  const uploadToFirestore = async (metadata: FullMetadata, url: string) => {
    const { bucket, contentType, fullPath, name, size, timeCreated, updated } = metadata;
    await setDoc(doc(database, Collections.GALLERY, `IMG-${metadata.updated}`),
      ({
        bucket: bucket,
        contentType: contentType,
        fullPath: fullPath,
        name: name,
        size: size,
        timeCreated: timeCreated,
        updated: updated,
        url: url,
      }) as UploadImageType);
    setUploader(Uploader({ apiKey: "free" }));
    queryClient.invalidateQueries(UPLOADED_IMAGES_KEY);
  };

  const uploadToStorage = async (file: File) => {
    const _name = `${StorageFolder.GALLERY}/${file.name}`;
    const imageRef = ref(storage, _name);
    const { metadata } = await uploadBytes(imageRef, file);
    if (metadata) {
      const url = await getDownloadURL(ref(storage, _name));
      await uploadToFirestore(metadata, url);
    }
  };

  return (
    <UploadDropzone
      uploader={uploader}
      options={uploaderOptions}
      onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
      onComplete={onComplete}
      width="600px"
      height="250px"
    />
  );
};

export default UploaderComponent;