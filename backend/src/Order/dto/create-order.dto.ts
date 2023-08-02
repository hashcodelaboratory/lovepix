import { OmitType } from "@nestjs/mapped-types";
import { OrderEntity } from "../entities/order.entity";

export class CreateOrderDto extends OmitType(OrderEntity, ['id', 'order_state', 'payment', 'recipient', 'shipment']) {
}