import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";

@Injectable()
export class RecipientService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createRecipientDto: CreateRecipientDto) {
        return await this.prismaService.recipient.create({
            data: createRecipientDto
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

    async update(id: string, updateRecipientDto: UpdateRecipientDto) {
        return await this.prismaService.recipient.update({
            where: {
                id: id
            },
            data: updateRecipientDto
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