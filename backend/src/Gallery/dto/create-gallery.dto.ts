import { OmitType } from "@nestjs/mapped-types";
import { GalleryEntity } from "../entities/gallery.entity";

export class CreateGalleryDto extends OmitType(GalleryEntity, ['gallery_categories', 'dimensions', 'orders']) {
}