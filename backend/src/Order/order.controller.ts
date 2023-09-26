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
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiSecurity
} from '@nestjs/swagger';
import { ApikeyAuthGuard } from './../auth/guard/apikey-auth.guard';
import { AppSettings } from './../constants/constants';

@ApiTags(AppSettings.ORDER)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createData: OrderDto) {
    return this.orderService.create(createData);
  }

  @Post('many')
  createMany(@Body() createData: OrderDto[]) {
    return this.orderService.createMany(createData);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('orderedByDate')
  getOrderedByDate() {
    return this.orderService.getOrderedByDate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get(':id/price')
  getPrice(@Param('id') id: string) {
    return this.orderService.getPrice(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateData: Partial<OrderDto>) {
    return this.orderService.update(id, UpdateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.orderService.removeAll();
  }
}
