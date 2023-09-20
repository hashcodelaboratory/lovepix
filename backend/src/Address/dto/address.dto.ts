import { OmitType, PartialType } from "@nestjs/mapped-types";
import { AddressEntity } from "../entities/address.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class AddressDto extends OmitType(AddressEntity, ['id', 'billingAddress', 'shippingAddress']) {
    @ApiProperty({
        description: 'first name of user',
        example: 'Janko',
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: 'last name of user',
        example: 'Hrasko',
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: 'email of user',
        example: 'example@gmail.com',
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Telephone number of user',
        example: '0900123456',
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Street of Addresses',
        example: 'Neznama 350',
    })
    @IsNotEmpty()
    street: string;

    @ApiProperty({
        description: 'City of Addresses',
        example: 'Praha',
    })
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'zip code of city',
        example: '12365',
    })
    @IsNotEmpty()
    zip: string;
}