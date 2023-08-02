import { PartialType } from "@nestjs/mapped-types";
import { CreateOrder_itemDto } from "./create-order_item.dto";

export class UpdateOrder_itemDto extends PartialType(CreateOrder_itemDto) {}