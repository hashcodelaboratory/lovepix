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
            // include: {
            //     products: true
            // }
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
        const products = await this.prismaService.product.findMany({
            where: {
                categories: {
                    some: {
                        id: id
                    }
                }
            }
        });
        products.forEach(async (product) => {
            await this.prismaService.product.update({
                where: {
                    id: product.id
                },
                data: {
                    categoryIds: {
                        set: product.categoryIds.filter((category) => category !== id)
                    }
                }
            })
        })
        return await this.prismaService.category.delete({
            where: {
                id: id
            }
        });
    }
}