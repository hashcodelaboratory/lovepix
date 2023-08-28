import { OmitType } from "@nestjs/mapped-types";
import { PaymentEntity } from "../entities/payment.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class PaymentDto extends OmitType(PaymentEntity, ['id', 'orders']) {
    @ApiProperty({
        description: 'Example of shiping',
        example: 'dobierka',
    })
    @IsNotEmpty()
    method: string;

    @ApiProperty({
        description: 'Price of payment',
        example: 3,
    })
    @IsNotEmpty()
    price: number;
}