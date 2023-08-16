import {OmitType} from "@nestjs/mapped-types";
import {CategoryEntity} from "../entities/category.entity";
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CategoryDto extends OmitType(CategoryEntity, ['id', 'products']) {
  @ApiProperty({
    description: 'Category Title',
    example: 'Example of title',
  })
  @IsNotEmpty()
  title: string;
}