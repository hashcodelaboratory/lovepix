import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentDto } from './dto/shipment.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.SHIPMENT)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('shipments')
export class ShipmentController {
    constructor(private readonly shipmentService: ShipmentService) {}
    
    @Post()
    create(@Body() createData: ShipmentDto) {
        return this.shipmentService.create(createData);
    }
    
    @Get()
    findAll() {
        return this.shipmentService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shipmentService.findOne(id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<ShipmentDto>) {
        return this.shipmentService.update(id, updateData);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.shipmentService.remove(id);
    }
}