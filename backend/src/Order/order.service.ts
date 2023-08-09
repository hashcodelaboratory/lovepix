import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: OrderDto) {
        return await this.prismaService.order.create({
            data: createData,
        })
    }

    findAll() {
        return this.prismaService.order.findMany({
            include: {
                orderItems: true
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.order.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<OrderDto>) {
        return await this.prismaService.order.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.order.delete({
            where: {
                id: id
            }
        });
    }

    async removeAll() {
        return await this.prismaService.order.deleteMany({});
    }
}