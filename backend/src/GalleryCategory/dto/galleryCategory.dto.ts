import { OmitType } from "@nestjs/mapped-types";
import { GalleryCategoryEntity } from "../entities/galleryCategory.entity";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class GalleryCategoryDto extends OmitType(GalleryCategoryEntity, ['id', 'galleries']) {
    @ApiProperty({
        description: 'Gallery Category Title',
        example: 'Example of Gallery Catergory title',
    })
    @IsNotEmpty()
    title: string;
}