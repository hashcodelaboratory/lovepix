import { OmitType } from "@nestjs/mapped-types";
import { OrderStateEntity } from "../entities/orderState.entity";

export class CreateOrderStateDto extends OmitType(OrderStateEntity, ['id', 'orders']) {
}