import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderStateDto } from "./dto/create-orderState.dto";
import { UpdateOrderStateDto } from "./dto/update-orderState.dto";

@Injectable()
export class OrderStateService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrderStateDto: CreateOrderStateDto) {
        return await this.prismaService.orderState.create({
            data: createOrderStateDto
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

    async update(id: string, updateOrderStateDto: UpdateOrderStateDto) {
        return await this.prismaService.orderState.update({
            where: {
                id: id
            },
            data: updateOrderStateDto
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