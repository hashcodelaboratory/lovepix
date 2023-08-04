import { PartialType } from "@nestjs/mapped-types";
import { CreateGalleryCategoryDto } from "./create-galleryCategory.dto";

export class UpdateGalleryCategoryDto extends PartialType(CreateGalleryCategoryDto) {}