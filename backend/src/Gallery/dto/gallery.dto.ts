import { OmitType } from "@nestjs/mapped-types";
import { GalleryEntity } from "../entities/gallery.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class GalleryDto extends OmitType(GalleryEntity, ['id', 'galleryCategories', 'dimensions', 'orders']) {
    @ApiProperty({
        description: 'Input for gallery category Ids',
        example: 'Number of ID some gallery Category',
    })
    @IsNotEmpty()
    galleryCategoryIds: string[];

    @ApiProperty({
        description: 'Input for dimension Ids',
        example: 'Number of ID some dimension',
    })
    @IsNotEmpty()
    dimensionIds: string[];

    @ApiProperty({
        description: 'Name of bucket',
        example: 'Bucket name',
    })
    @IsNotEmpty()
    bucket: string;

    @ApiProperty({
        description: 'Full Path of Image',
        example: 'Example - \/fake\/path\/XhNjIEyoyQ ',
    })
    @IsNotEmpty()
    fullPath: string;

    @ApiProperty({
        description: 'Price',
        example: 'Number of price',
    })
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: 'Size',
        example: 'Number of size',
    })
    @IsNotEmpty()
    size: number;

    @ApiProperty({
        description: 'Date of created',
        example: 'Date of created',
    })
    @IsNotEmpty()
    timeCreated: Date;

    @ApiProperty({
        description: 'Date of updated',
        example: 'Date of updated',
    })
    @IsNotEmpty()
    updatedAt: Date;

    @ApiProperty({
        description: 'Url of image',
        example: 'Image url',
    })
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        description: 'Name of image',
        example: 'Image name',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Image',
        example: 'title of image',
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        description: 'Value of material property',
        example: 'null',
    })
    @IsNotEmpty()
    material: string;
}
