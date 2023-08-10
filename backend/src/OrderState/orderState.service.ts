import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStateDto } from "./dto/orderState.dto";

@Injectable()
export class OrderStateService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: OrderStateDto) {
        return this.prismaService.orderState.create({
            data: createData
        })
    }

    async createMany(createData: OrderStateDto[]) {
        return this.prismaService.orderState.createMany({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.orderState.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.orderState.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<OrderStateDto>) {
        return await this.prismaService.orderState.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.orderState.delete({
            where: {
                id: id
            }
        });
    }
}