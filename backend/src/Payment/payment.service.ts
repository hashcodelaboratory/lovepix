import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createPaymentDto: CreatePaymentDto) {
        return await this.prismaService.payment.create({
            data: createPaymentDto
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

    async update(id: string, updatePaymentDto: UpdatePaymentDto) {
        return await this.prismaService.payment.update({
            where: {
                id: id
            },
            data: updatePaymentDto
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