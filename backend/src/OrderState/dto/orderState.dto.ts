import { OmitType } from "@nestjs/mapped-types";
import { OrderStateEntity } from "../entities/orderState.entity";

export class OrderStateDto extends OmitType(OrderStateEntity, ['id', 'orders']) {
}