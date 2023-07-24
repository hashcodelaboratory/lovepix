import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryCategoryService } from './gallery_category.service';
import { CreateGallery_categoryDto } from './dto/create-gallery_category.dto';
import { UpdateGallery_categoryDto } from './dto/update-gallery_category.dto';

@Controller('gallery_categories')
export class GalleryCategoryController {
    constructor(private readonly galleryCategoryService: GalleryCategoryService) {
    }

    @Post()
    create(@Body() createGalleryCategoryDto: CreateGallery_categoryDto) {
        return this.galleryCategoryService.create(createGalleryCategoryDto);
    }

    @Get()
    findAll() {
        return this.galleryCategoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.galleryCategoryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGalleryCategoryDto: UpdateGallery_categoryDto) {
        return this.galleryCategoryService.update(id, updateGalleryCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.galleryCategoryService.remove(id);
    }
}