import { OmitType } from "@nestjs/mapped-types";
import { Order_itemEntity } from "../entities/order_item.entity";

export class CreateOrder_itemDto extends OmitType(Order_itemEntity, ['id', 'order', 'product', 'image']) {
}