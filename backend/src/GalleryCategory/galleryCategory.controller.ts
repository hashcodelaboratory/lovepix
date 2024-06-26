import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryCategoryService } from './galleryCategory.service';
import { GalleryCategoryDto } from './dto/galleryCategory.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.GALLERY_CATEGORY)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('galleryCategories')
export class GalleryCategoryController {
    constructor(private readonly galleryCategoryService: GalleryCategoryService) {
    }

    @Post()
    create(@Body() createData: GalleryCategoryDto) {
        return this.galleryCategoryService.create(createData);
    }

    @Post('many')
    createMany(@Body() createData: GalleryCategoryDto[]) {
        return this.galleryCategoryService.createMany(createData);
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