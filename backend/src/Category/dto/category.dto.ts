import { OmitType } from "@nestjs/mapped-types";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryDto extends OmitType(CategoryEntity, ['id', 'products']) {
}