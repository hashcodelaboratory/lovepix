import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryDto } from './dto/gallery.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.GALLERY)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('galleries')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {
    }

    @Post()
    create(@Body() createData: GalleryDto) {
        return this.galleryService.create(createData);
    }

    @Post('many')
    createMany(@Body() createData: GalleryDto[]) {
        return this.galleryService.createMany(createData);
    }

    @Get()
    findAll() {
        return this.galleryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.galleryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<GalleryDto>) {
        return this.galleryService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.galleryService.remove(id);
    }

    @Delete()
    removeAll() {
        return this.galleryService.removeAll();
    }
}