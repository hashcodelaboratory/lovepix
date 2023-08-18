import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DimensionService } from './dimension.service';
import { DimensionDto } from './dto/dimension.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";

const API="API-KEY"

@ApiTags('Dimension')
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(API)
@Controller('dimensions')
export class DimensionController {
    constructor(private readonly dimensionService: DimensionService) {
    }

    @Post()
    create(@Body() createData: DimensionDto) {
        return this.dimensionService.create(createData);
    }

    @Get()
    findAll() {
        return this.dimensionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dimensionService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<DimensionDto>) {
        return this.dimensionService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dimensionService.remove(id);
    }

    @Delete()
    removeAll() {
        return this.dimensionService.removeAll();
    }
}