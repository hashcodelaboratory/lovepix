import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDimensionDto } from "./dto/create-dimension.dto";
import { UpdateDimensionDto } from "./dto/update-dimension.dto";

@Injectable()
export class DimensionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createDimensionDto: CreateDimensionDto) {
        return await this.prismaService.dimension.create({
            data: createDimensionDto
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

    async update(id: string, updateDimensionDto: UpdateDimensionDto) {
        return await this.prismaService.dimension.update({
            where: {
                id: id
            },
            data: updateDimensionDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.dimension.delete({
            where: {
                id: id
            }
        });
    }
}