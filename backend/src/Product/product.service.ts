import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto/product.dto"; 

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: ProductDto) {
        if(Array.isArray(createData)) {
            createData.forEach(async (product) => {
                await this.prismaService.product.create({
                    data: {
                        ...product,
                        categories: {
                            connect: product.categoryIDs.map((category) => ({id: category}))
                        },
                    }
                })
            })
            return createData;
        }
        else {
            return await this.prismaService.product.create({
                data: {
                    ...createData,
                    categories: {
                        connect: createData.categoryIds.map((category) => ({id: category}))
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
        return await this.prismaService.product.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<ProductDto>) {
        return await this.prismaService.product.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.product.delete({
            where: {
                id: id
            }
        });
    }

    async removeAll() {
        return await this.prismaService.product.deleteMany({});
    }
}
