import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderStateDto } from "./create-orderState.dto";

export class UpdateOrderStateDto extends PartialType(CreateOrderStateDto) {}