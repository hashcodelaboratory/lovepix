import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";


@ApiTags('Addresses')
@UseGuards(ApikeyAuthGuard)
@ApiSecurity('API-KEY')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post()
    create(@Body() createData: AddressDto) {
        return this.addressService.create(createData);
    }

    @Get()
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.addressService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<AddressDto>) {
        return this.addressService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.addressService.remove(id);
    }
}