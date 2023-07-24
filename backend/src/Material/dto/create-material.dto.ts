import { OmitType } from "@nestjs/mapped-types";
import { MaterialEntity } from "../entities/material.entity";

export class CreateMaterialDto extends OmitType(MaterialEntity, ['id', 'orders']) {
}