import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.PRODUCT)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post()
    create(@Body() createData: ProductDto) {
        return this.productService.create(createData);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<ProductDto>) {
        return this.productService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }

    @Delete()
    removeAll() {
        return this.productService.removeAll();
    }
}