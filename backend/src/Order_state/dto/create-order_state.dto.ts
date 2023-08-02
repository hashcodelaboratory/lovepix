import { OmitType } from "@nestjs/mapped-types";
import { OrderStateEntity } from "../entities/order_state.entity";

export class CreateOrder_stateDto extends OmitType(OrderStateEntity, ['id', 'orders']) {
}