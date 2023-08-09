import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryCategoryService } from './galleryCategory.service';
import { GalleryCategoryDto } from './dto/galleryCategory.dto';

@Controller('galleryCategories')
export class GalleryCategoryController {
    constructor(private readonly galleryCategoryService: GalleryCategoryService) {
    }

    @Post()
    create(@Body() createData: GalleryCategoryDto) {
        return this.galleryCategoryService.create(createData);
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
    update(@Param('id') id: string, @Body() updateData: Partial<GalleryCategoryDto>) {
        return this.galleryCategoryService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.galleryCategoryService.remove(id);
    }
}