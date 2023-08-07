import { OmitType } from "@nestjs/mapped-types";
import { GalleryCategoryEntity } from "../entities/galleryCategory.entity";

export class GalleryCategoryDto extends OmitType(GalleryCategoryEntity, ['id', 'galleries']) {
}