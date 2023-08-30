import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientDto } from './dto/recipient.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiSecurity
} from '@nestjs/swagger';
import { ApikeyAuthGuard } from './../auth/guard/apikey-auth.guard';
import { AppSettings } from './../constants/constants';

@ApiTags(AppSettings.RECIPIENT)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('recipients')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post()
  create(@Body() createData: RecipientDto) {
    return this.recipientService.create(createData);
  }

  @Post('many')
  createMany(@Body() createData: RecipientDto[]) {
    return this.recipientService.createMany(createData);
  }

  @Get()
  findAll() {
    return this.recipientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(id);
  }

  @Get(':id/orders')
  findOrders(@Param('id') id: string) {
    return this.recipientService.findOrders(id);
  }

  @Get(':id/addresses')
  findAddresses(@Param('id') id: string) {
    return this.recipientService.findAddresses(id);
  }

  @Get(':id/user')
  findUser(@Param('id') id: string) {
    return this.recipientService.findUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<RecipientDto>) {
    return this.recipientService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientService.remove(id);
  }
}
