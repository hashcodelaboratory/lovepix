import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddressService} from './address.service';
import {AddressDto} from './dto/address.dto';
import {ApiSecurity, ApiTags} from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.ADDRESS)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
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