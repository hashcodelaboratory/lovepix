import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@Injectable()
export class OrderItemService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrderItemDto: CreateOrderItemDto) {
        return await this.prismaService.orderItem.create({
            data: createOrderItemDto
        })
    }

    findAll() {
        return this.prismaService.orderItem.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.orderItem.findUnique({
            where: {
                id: id
            }
        });
    }

    async remove(id: string) {
        return await this.prismaService.orderItem.delete({
            where: {
                id: id
            }
        });
    }
}