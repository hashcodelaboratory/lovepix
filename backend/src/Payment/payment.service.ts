import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentDto } from "./dto/payment.dto";

@Injectable()
export class PaymentService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: PaymentDto) {
        return this.prismaService.payment.create({
            data: createData
        })
    }

    async createMany(createData: PaymentDto[]) {
        return this.prismaService.payment.createMany({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.payment.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.payment.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<PaymentDto>) {
        return await this.prismaService.payment.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.payment.delete({
            where: {
                id: id
            }
        });
    }
}