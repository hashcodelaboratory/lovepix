import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return await this.prismaService.category.create({
            data: createCategoryDto
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

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return await this.prismaService.category.update({
            where: {
                id: id
            },
            data: updateCategoryDto
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