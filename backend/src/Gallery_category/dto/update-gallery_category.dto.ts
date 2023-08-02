import { PartialType } from "@nestjs/mapped-types";
import { CreateGallery_categoryDto } from "./create-gallery_category.dto";

export class UpdateGallery_categoryDto extends PartialType(CreateGallery_categoryDto) {}