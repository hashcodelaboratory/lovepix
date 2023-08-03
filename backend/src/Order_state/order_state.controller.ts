import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStateService } from './order_state.service';
import { CreateOrder_stateDto } from './dto/create-order_state.dto';
import { UpdateOrder_stateDto } from './dto/update-order_state.dto';

@Controller('order_states')
export class OrderStateController {
    constructor(private readonly orderStateService: OrderStateService) {
    }

    @Post()
    create(@Body() createOrderStateDto: CreateOrder_stateDto) {
        return this.orderStateService.create(createOrderStateDto);
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
    update(@Param('id') id: string, @Body() updateOrderStateDto: UpdateOrder_stateDto) {
        return this.orderStateService.update(id, updateOrderStateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderStateService.remove(id);
    }
}