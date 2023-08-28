import { OmitType } from "@nestjs/mapped-types";
import { OrderEntity } from "../entities/order.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class OrderDto extends OmitType(OrderEntity, ['id', 'orderState', 'payment', 'recipient', 'shipment', 'orderItems']) {
    @ApiProperty({
        description: 'Input of recipient ID',
        example: 'Input of recipient ID',
    })
    @IsNotEmpty()
    recipientId: string;

    @ApiProperty({
        description: 'Input of order state ID',
        example: 'Input of order state ID',
    })
    @IsNotEmpty()
    orderStateId: string;

    @ApiProperty({
        description: 'Input of payment ID',
        example: 'Input of payment ID',
    })
    @IsNotEmpty()
    paymentId: string;

    @ApiProperty({
        description: 'Input of shipment ID',
        example: 'Input of shipment ID',
    })
    @IsNotEmpty()
    shipmentId: string;

    @ApiProperty({
        description: 'Input of order date',
        example: "2023-07-15T21:12:01.000Z",
    })
    @IsNotEmpty()
    orderDate: Date;
}