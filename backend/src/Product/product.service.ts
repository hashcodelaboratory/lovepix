import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto"; 
import { UpdateProductDto } from "./dto/update-product.dto";
import { findById } from "../utils/query";

const findAllCategoriesQueryWithThatProduct = (id: string) => ({
    where: {
        products: {
            some: {
                id: id
            }
        }
    }
})

const updateRelationsQueryOnProductDelete = (id: string, productIds: string[]) => ({
    productIds: {
        set: productIds.filter((product) => product !== id)
    }
})

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        if(Array.isArray(createProductDto)) {
            createProductDto.forEach(async (product) => {
                await this.prismaService.product.create({
                    data: {
                        ...product,
                        categories: {
                            connect: product.categoryIDs.map((category) => ({id: category}))
                        },
                    }
                })
            })
            return createProductDto;
        }
        else {
            return await this.prismaService.product.create({
                data: {
                    ...createProductDto,
                    categories: {
                        connect: createProductDto.categoryIds.map((category) => ({id: category}))
                    },
                }
            })
        }
    }

    findAll() {
        return this.prismaService.product.findMany({
            include: {
                orders: true,
            }
        });
    }

    async findOne(id: string) {
        return this.prismaService.product.findUnique(findById(id));
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return this.prismaService.product.update({
            ...findById(id),
            data: updateProductDto
        });
    }

    async remove(id: string) {
        const categories = await this.prismaService.category.findMany(findAllCategoriesQueryWithThatProduct(id));
        
        await this.prismaService.$transaction([
            ...categories.map((category) => this.prismaService.category.update({
                ...findById(category.id),
                data: updateRelationsQueryOnProductDelete(id, category.productIds)
            })),
        ])


        return this.prismaService.product.delete(findById(id));
    }

    async removeAll() {
        return await this.prismaService.product.deleteMany({});
    }
}
