import { OmitType } from "@nestjs/mapped-types";
import { DimensionEntity } from "../entities/dimension.entity";

export class DimensionDto extends OmitType(DimensionEntity, ['id', 'galleries']) {
}