import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";

@Injectable()
export class MaterialService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createMaterialDto: CreateMaterialDto) {
        return await this.prismaService.material.create({
            data: createMaterialDto
        })
    }

    findAll() {
        return this.prismaService.material.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.material.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateMaterialDto: UpdateMaterialDto) {
        return await this.prismaService.material.update({
            where: {
                id: id
            },
            data: updateMaterialDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.material.delete({
            where: {
                id: id
            }
        });
    }
}