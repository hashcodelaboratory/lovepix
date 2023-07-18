import { OmitType } from "@nestjs/mapped-types";
import { OrderItemEntity } from "../entities/order_item.entity";

export class CreateOrderItemDto extends OmitType(OrderItemEntity, ['id', 'order']) {
}