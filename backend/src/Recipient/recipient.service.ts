import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RecipientDto } from "./dto/recipient.dto";

@Injectable()
export class RecipientService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: RecipientDto) {
        return this.prismaService.recipient.create({
            data: createData
        })
    }

    async createMany(createData: RecipientDto[]) {
        return this.prismaService.recipient.createMany({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.recipient.findMany({
            include: {
                orders: true
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.recipient.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<RecipientDto>) {
        return await this.prismaService.recipient.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.recipient.delete({
            where: {
                id: id
            }
        });
    }
}