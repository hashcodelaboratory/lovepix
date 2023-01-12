import jsPDF from "jspdf";
import {Image as ImageType} from "../../../../../../../../common/types/order";
import {Material} from "../../../../../../../../common/enums/material";
import {UPLOAD_IMAGES} from "../../../../../../../home/components/upload-image/dropzone/utils";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {database, storage} from "../../../../../../../../../utils/firebase/config";
import {doc as document, writeBatch} from "@firebase/firestore";
import {Collections} from "../../../../../../../../../utils/firebase/enums";

const getX = (material: Material) => {
    switch (material) {
        case Material.AKRYL:
            return 0;
        case Material.CANVAS:
            return 5;
        case Material.DIBOND:
            return 0;
    }
}

const getY = (material: Material) => {
    switch (material) {
        case Material.AKRYL:
            return 0;
        case Material.CANVAS:
            return 5;
        case Material.DIBOND:
            return 0;
    }
}

const formatX = (material: Material, width: number) => {
    switch (material) {
        case Material.AKRYL:
            return width + 1;
        case Material.CANVAS:
            return width + 10;
        case Material.DIBOND:
            return width + 1;
    }
}

const formatY = (material: Material, height: number) => {
    switch (material) {
        case Material.AKRYL:
            return height + 1;
        case Material.CANVAS:
            return height + 10;
        case Material.DIBOND:
            return height + 1;
    }
}

const getWidth = (material: Material, width: number) => {
    switch (material) {
        case Material.AKRYL:
            return width + 1;
        case Material.CANVAS:
            return width;
        case Material.DIBOND:
            return width + 1;
    }
}

const getHeight = (material: Material, height: number) => {
    switch (material) {
        case Material.AKRYL:
            return height + 1;
        case Material.CANVAS:
            return height;
        case Material.DIBOND:
            return height + 1;
    }
}

export const generatePdf = async (upload: ImageType, id: string) => {
    const { url, width, height, material } = upload;

    const image = new Image();
    image.src = url;

    const doc = new jsPDF({
        orientation: width >= height ? "landscape" : "portrait",
        unit: 'cm',
        format: [formatX(material, width), formatY(material, height)]
    });
    doc.deletePage(1);
    doc.addPage();
    doc.addImage(image, 'jpeg', getX(material), getY(material), getWidth(material, width), getHeight(material, height));

    const pdfURL = doc.output("bloburl");
    window.open(pdfURL as any, "_blank");

    const uploadURL = `${UPLOAD_IMAGES}/${id}/${id}_${width}x${height}_${upload.qty}`;

    const res = await fetch(pdfURL ?? '');
    const file = await res.blob();

    const storageRef = ref(storage, uploadURL);

    const {
        metadata: { name },
    } = await uploadBytes(storageRef, file);
    if (name) {
        const url = await getDownloadURL(
            ref(storage, `${UPLOAD_IMAGES}/${id}/${name}`)
        );
        const batch = writeBatch(database);
        const docRef = document(database, Collections.ORDERS, id);
        await batch.update(docRef, {
            pdf: url
        });

        await batch.commit();
    }
}