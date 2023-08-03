import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrder_itemDto } from "./dto/create-order_item.dto";
import { UpdateOrder_itemDto } from "./dto/update-order_item.dto";

@Injectable()
export class OrderItemService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrderItemDto: CreateOrder_itemDto) {
        return await this.prismaService.order_item.create({
            data: createOrderItemDto
        })
    }

    findAll() {
        return this.prismaService.order_item.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.order_item.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateOrderItemDto: UpdateOrder_itemDto) {
        return await this.prismaService.order_item.update({
            where: {
                id: id
            },
            data: updateOrderItemDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.order_item.delete({
            where: {
                id: id
            }
        });
    }
}