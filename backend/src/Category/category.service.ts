import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {findById} from "../utils/query";

// const findAllCategoriesQueryWithProducts = {
//     include: {
//         products: true
//     }
// }

const findAllProductsQueryWithThatCategory = (id: string) => ({
    where: {
        categories: {
            some: {
                id: id
            }
        }
    }
})

const updateRelationsQueryOnCategoryDelete = (id: string, categoryIds: string[]) => ({
    categoryIds: {
        set: categoryIds.filter((category) => category !== id)
    }
})

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prismaService.category.create({
            data: createCategoryDto
        })
    }

    findAll() {
        return this.prismaService.category.findMany();
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
        const products = await this.prismaService.product.findMany(findAllProductsQueryWithThatCategory(id));
        
        await this.prismaService.$transaction([
            ...products.map((product) => this.prismaService.product.update({
                ...findById(product.id),
                data: updateRelationsQueryOnCategoryDelete(id, product.categoryIds)
            })),
        ])

        return this.prismaService.category.delete(findById(id));
    }
}