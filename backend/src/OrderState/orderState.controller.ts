import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStateService } from './orderState.service';
import { OrderStateDto } from './dto/orderState.dto';

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