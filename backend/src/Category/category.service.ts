import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {findById} from "../utils/query";

const findAllCategoriesQueryWithProducts = {
    include: {
        products: true
    }
}

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prismaService.category.create({
            data: createCategoryDto
        })
    }

    findAll() {
        return this.prismaService.category.findMany(findAllCategoriesQueryWithProducts);
    }

    async findOne(id: string) {
        return this.prismaService.category.findUnique(findById(id));
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.prismaService.category.update({
            ...findById(id),
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
        const promises = products.map(({id, categoryIDs}) => this.prismaService.product.update({
            ...findById(id),
            data: {
                categoryIDs: {
                    set: categoryIDs.filter((category) => category !== id)
                }
            }
        }))

        await Promise.all(promises)

        return this.prismaService.category.delete(findById(id));
    }
}