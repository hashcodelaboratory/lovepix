import { Gallery_category as GalleryCategoryModel } from "@prisma/client";
import type { Gallery } from "@prisma/client";

export class GalleryCategoryEntity implements GalleryCategoryModel {
    id: string;
    title: string;
    galleryIDs: string[];
    galleries: Gallery[];
}