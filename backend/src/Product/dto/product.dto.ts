import { OmitType } from "@nestjs/mapped-types";
import { ProductEntity } from "../entities/product.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class ProductDto extends OmitType(ProductEntity, ['id', 'categories', 'orders']) {
    @ApiProperty({
        description: 'Ids example of categories from Mongo Database',
        example: ["64d22516805b0e8d04c4b798", "64d2251f805b0e8d04c4b799", "64d22525805b0e8d04c4b79a"],
    })
    @IsNotEmpty()
    categoryIds: string[];

    @ApiProperty({
        description: 'Name of the product',
        example: 'Name of the product',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of product',
        example: 'Description of product',
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Count of products',
        example: 5,
    })
    @IsNotEmpty()
    count: number;

    @ApiProperty({
        description: 'Vesmir',
        example: 'Vesmir',
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        description: 'path of image',
        example: 'path of image',
    })
    @IsNotEmpty()
    path: string;

    @ApiProperty({
        description: 'Price of product',
        example: 179.99,
    })
    @IsNotEmpty()
    price: number;
}