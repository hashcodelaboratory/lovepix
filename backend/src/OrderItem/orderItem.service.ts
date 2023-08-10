import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderItemDto } from "./dto/orderItem.dto";

@Injectable()
export class OrderItemService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: OrderItemDto) {
        return this.prismaService.orderItem.create({
            data: createData
        })
    }

    async createMany(createData: OrderItemDto[]) {
        return this.prismaService.orderItem.createMany({
            data: createData
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

    async update(id: string, updateData: Partial<OrderItemDto>) {
        return await this.prismaService.orderItem.update({
            where: {
                id: id
            },
            data: updateData
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