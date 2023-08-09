import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createData: UserDto) {
        return this.userService.create(createData);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<UserDto>) {
        return this.userService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    @Get(':id/orders')
    findOrders(@Param('id') id: string) {
        return this.userService.findOrders(id);
    }

    @Delete()
    removeAll() {
        return this.userService.removeAll();
    }
}