import { OmitType } from "@nestjs/mapped-types";
import { ShipmentEntity } from "../entities/shipment.entity";

export class ShipmentDto extends OmitType(ShipmentEntity, ['id', 'orders']) {
}