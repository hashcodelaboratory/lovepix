import { OmitType } from "@nestjs/mapped-types";
import { GalleryCategoryEntity } from "../entities/galleryCategory.entity";

export class CreateGalleryCategoryDto extends OmitType(GalleryCategoryEntity, ['id', 'galleries']) {
}