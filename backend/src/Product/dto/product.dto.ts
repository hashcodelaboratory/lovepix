import { OmitType } from "@nestjs/mapped-types";
import { ProductEntity } from "../entities/product.entity";

export class ProductDto extends OmitType(ProductEntity, ['id', 'categories', 'orders']) {
}