import { OmitType } from "@nestjs/mapped-types";
import { OrderEntity } from "../entities/order.entity";

export class CreateOrderDto extends OmitType(OrderEntity, ['id', 'images', 'order_state', 'payment', 'products', 'recipient', 'shipment']) {
}