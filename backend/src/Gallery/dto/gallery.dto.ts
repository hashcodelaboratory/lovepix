import { OmitType } from "@nestjs/mapped-types";
import { GalleryEntity } from "../entities/gallery.entity";

export class GalleryDto extends OmitType(GalleryEntity, ['id', 'galleryCategories', 'dimensions', 'orders']) {
}