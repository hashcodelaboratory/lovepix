import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrderDto: CreateOrderDto) {
        return await this.prismaService.order.create({
            data: createOrderDto
        })
    }

    findAll() {
        return this.prismaService.order.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.order.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        return await this.prismaService.order.update({
            where: {
                id: id
            },
            data: updateOrderDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.order.delete({
            where: {
                id: id
            }
        });
    }
}