import { OmitType } from "@nestjs/mapped-types";
import { RecipientEntity } from "../entities/recipient.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RecipientDto extends OmitType(RecipientEntity, ['id', 'orders', 'user', 'billingAddress', 'shippingAddress']) {
    @ApiProperty({
        description: 'Id of billing Address',
        example: '64d9ed7c344f8b8f93d0892c',
    })
    @IsNotEmpty()
    billingAddressId: string;

    @ApiProperty({
        description: 'Id of User',
        example: '64d9ebb975736aee4d47195b',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Example of ICO',
        example: '123456789',
    })
    @IsNotEmpty()
    ico: string;

    @ApiProperty({
        description: 'Example of DIC',
        example: '1122334455',
    })
    @IsNotEmpty()
    dic: string;
}