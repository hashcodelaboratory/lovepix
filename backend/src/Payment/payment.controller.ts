import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @Post()
    create(@Body() createData: PaymentDto) {
        return this.paymentService.create(createData);
    }

    @Post('many')
    createMany(@Body() createData: PaymentDto[]) {
        return this.paymentService.createMany(createData);
    }

    @Get()
    findAll() {
        return this.paymentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<PaymentDto>) {
        return this.paymentService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentService.remove(id);
    }
}