import { OmitType } from "@nestjs/mapped-types";
import { OrderItemEntity } from "../entities/orderItem.entity";

export class OrderItemDto extends OmitType(OrderItemEntity, ['id', 'order', 'product', 'image']) {
}