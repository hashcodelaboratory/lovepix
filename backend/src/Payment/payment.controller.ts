import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiTags,
    ApiSecurity
  } from '@nestjs/swagger';
import {ApikeyAuthGuard} from "./../auth/guard/apikey-auth.guard";
import {AppSettings} from "./../constants/constants";

@ApiTags(AppSettings.PAYMENT)
@UseGuards(ApikeyAuthGuard)
@ApiSecurity(AppSettings.API)
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @Post()
    create(@Body() createData: PaymentDto) {
        return this.paymentService.create(createData);
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