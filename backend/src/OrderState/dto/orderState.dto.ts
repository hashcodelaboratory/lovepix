import { OmitType } from "@nestjs/mapped-types";
import { OrderStateEntity } from "../entities/orderState.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class OrderStateDto extends OmitType(OrderStateEntity, ['id', 'orders']) {
    @ApiProperty({
        description: 'Name of the order state',
        example: 'Name of the order state',
    })
    @IsNotEmpty()
    title: string;
}