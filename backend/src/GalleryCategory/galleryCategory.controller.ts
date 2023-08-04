import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryCategoryService } from './galleryCategory.service';
import { CreateGalleryCategoryDto } from './dto/create-galleryCategory.dto';
import { UpdateGalleryCategoryDto } from './dto/update-galleryCategory.dto';

@Controller('galleryCategories')
export class GalleryCategoryController {
    constructor(private readonly galleryCategoryService: GalleryCategoryService) {
    }

    @Post()
    create(@Body() createGalleryCategoryDto: CreateGalleryCategoryDto) {
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
    update(@Param('id') id: string, @Body() updateGalleryCategoryDto: UpdateGalleryCategoryDto) {
        return this.galleryCategoryService.update(id, updateGalleryCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.galleryCategoryService.remove(id);
    }
}