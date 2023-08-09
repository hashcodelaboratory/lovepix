import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: CategoryDto) {
        return await this.prismaService.category.create({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.category.findMany({
            include: {
                products: true
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.category.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<CategoryDto>) {
        return await this.prismaService.category.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.category.delete({
            where: {
                id: id
            }
        });
    }
}