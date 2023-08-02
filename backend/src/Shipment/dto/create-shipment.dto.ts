import { OmitType } from "@nestjs/mapped-types";
import { ShipmentEntity } from "../entities/shipment.entity";

export class CreateShipmentDto extends OmitType(ShipmentEntity, ['id', 'orders']) {
}