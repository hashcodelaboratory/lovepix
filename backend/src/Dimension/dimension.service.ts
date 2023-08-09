import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DimensionDto } from "./dto/dimension.dto";

@Injectable()
export class DimensionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: DimensionDto) {
        return await this.prismaService.dimension.create({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.dimension.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.dimension.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<DimensionDto>) {
        return await this.prismaService.dimension.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.dimension.delete({
            where: {
                id: id
            }
        });
    }

    async removeAll() {
        return await this.prismaService.dimension.deleteMany();
    }
}