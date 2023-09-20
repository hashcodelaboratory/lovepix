import { OmitType } from "@nestjs/mapped-types";
import { OrderItemEntity } from "../entities/orderItem.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class OrderItemDto extends OmitType(OrderItemEntity, ['id', 'order', 'product', 'image']) {
    @ApiProperty({
        description: 'Create order ID item with product',
        example: 'Create order ID item with product',
    })
    @IsNotEmpty()
    orderId: string;

    @ApiProperty({
        description: 'Input of product ID or null',
        example: 'Input of product ID or null',
    })
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        description: 'Number of Image ID or null',
        example: 'Number of Image ID or null',
    })
    @IsNotEmpty()
    imageId: string;

    @ApiProperty({
        description: 'Number of quantity',
        example: 123,
    })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: 'Name of the material or null',
        example: 'Name of the material or null',
    })
    @IsNotEmpty()
    material: string;

    @ApiProperty({
        description: 'Size of the dimension or null',
        example: 'Size of the dimension or null',
    })
    @IsNotEmpty()
    dimension: string;

    @ApiProperty({
        description: 'ID of voucher or null',
        example: 'ID of voucher or null',
    })
    @IsNotEmpty()
    voucher: string;
}