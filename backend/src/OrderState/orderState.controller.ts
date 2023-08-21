import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStateService } from './orderState.service';
import { OrderStateDto } from './dto/orderState.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.ORDER_STATE)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('orderStates')
export class OrderStateController {
    constructor(private readonly orderStateService: OrderStateService) {
    }

    @Post()
    create(@Body() createData: OrderStateDto) {
        return this.orderStateService.create(createData);
    }

    @Get()
    findAll() {
        return this.orderStateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderStateService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<OrderStateDto>) {
        return this.orderStateService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderStateService.remove(id);
    }
}