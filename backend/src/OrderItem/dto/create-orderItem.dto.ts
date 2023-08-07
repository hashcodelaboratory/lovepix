import { OmitType } from "@nestjs/mapped-types";
import { OrderItemEntity } from "../entities/orderItem.entity";

export class CreateOrderItemDto extends OmitType(OrderItemEntity, ['id', 'order', 'product', 'image']) {
}