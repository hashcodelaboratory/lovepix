import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';

@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post()
    create(@Body() createData: AddressDto) {
        return this.addressService.create(createData);
    }
    
    @Post('many')
    createMany(@Body() createData: AddressDto[]) {
        return this.addressService.createMany(createData);
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