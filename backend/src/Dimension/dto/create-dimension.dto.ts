import { OmitType } from "@nestjs/mapped-types";
import { DimensionEntity } from "../entities/dimension.entity";

export class CreateDimensionDto extends OmitType(DimensionEntity, ['id', 'galleries']) {
}