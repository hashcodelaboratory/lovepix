import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientDto } from './dto/recipient.dto';

@Controller('recipients')
export class RecipientController {
    constructor(private readonly recipientService: RecipientService) {}
    
    @Post()
    create(@Body() createData: RecipientDto) {
        return this.recipientService.create(createData);
    }
    
    @Get()
    findAll() {
        return this.recipientService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipientService.findOne(id);
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