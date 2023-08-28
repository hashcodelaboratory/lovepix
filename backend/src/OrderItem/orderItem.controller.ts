import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemService } from './orderItem.service';
import { OrderItemDto } from './dto/orderItem.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.ORDER_ITEM)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('orderItems')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {
    }

    @Post()
    create(@Body() createData: OrderItemDto) {
        return this.orderItemService.create(createData);
    }

    @Post('many')
    createMany(@Body() createData: OrderItemDto[]) {
        return this.orderItemService.createMany(createData);
    }

    @Get()
    findAll() {
        return this.orderItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderItemService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<OrderItemDto>) {
        return this.orderItemService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderItemService.remove(id);
    }
}