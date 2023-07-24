import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrder_stateDto } from "./dto/create-order_state.dto";
import { UpdateOrder_stateDto } from "./dto/update-order_state.dto";

@Injectable()
export class OrderStateService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createOrderStateDto: CreateOrder_stateDto) {
        return await this.prismaService.order_state.create({
            data: createOrderStateDto
        })
    }

    findAll() {
        return this.prismaService.order_state.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.order_state.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateOrderStateDto: UpdateOrder_stateDto) {
        return await this.prismaService.order_state.update({
            where: {
                id: id
            },
            data: updateOrderStateDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.order_state.delete({
            where: {
                id: id
            }
        });
    }
}