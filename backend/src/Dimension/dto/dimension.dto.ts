import { OmitType } from "@nestjs/mapped-types";
import { DimensionEntity } from "../entities/dimension.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class DimensionDto extends OmitType(DimensionEntity, ['id', 'galleries']) {
    @ApiProperty({
        description: 'Dimension Title',
        example: 'Example of dimension title',
    })
    @IsNotEmpty()
    title: string;
}