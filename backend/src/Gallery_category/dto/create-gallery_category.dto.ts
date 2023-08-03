import { OmitType } from "@nestjs/mapped-types";
import { GalleryCategoryEntity } from "../entities/gallery_category.entity";

export class CreateGallery_categoryDto extends OmitType(GalleryCategoryEntity, ['id', 'galleries']) {
}