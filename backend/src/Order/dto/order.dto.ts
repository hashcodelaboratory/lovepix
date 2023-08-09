import { OmitType } from "@nestjs/mapped-types";
import { OrderEntity } from "../entities/order.entity";

export class OrderDto extends OmitType(OrderEntity, ['id', 'orderState', 'payment', 'recipient', 'shipment', 'orderItems']) {
}