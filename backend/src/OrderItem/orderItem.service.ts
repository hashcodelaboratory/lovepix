import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderItemDto } from "./dto/create-orderItem.dto";
import { UpdateOrderItemDto } from "./dto/update-orderItem.dto";

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

    async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
        return await this.prismaService.orderItem.update({
            where: {
                id: id
            },
            data: updateOrderItemDto
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