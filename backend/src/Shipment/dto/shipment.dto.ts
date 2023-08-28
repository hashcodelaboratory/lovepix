import { OmitType } from "@nestjs/mapped-types";
import { ShipmentEntity } from "../entities/shipment.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class ShipmentDto extends OmitType(ShipmentEntity, ['id', 'orders']) {
    @ApiProperty({
        description: 'Example of method Shipment',
        example: 'osobný odber',
    })
    @IsNotEmpty()
    method: string;

    @ApiProperty({
        description: 'Number of shipment price',
        example: 0,
    })
    @IsNotEmpty()
    price: number;
}