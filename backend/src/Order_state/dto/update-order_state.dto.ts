import { PartialType } from "@nestjs/mapped-types";
import { CreateOrder_stateDto } from "./create-order_state.dto";

export class UpdateOrder_stateDto extends PartialType(CreateOrder_stateDto) {}