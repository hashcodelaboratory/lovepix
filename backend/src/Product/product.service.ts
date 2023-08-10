import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductDto } from "./dto/product.dto"; 

const createProductQuery = (createData: ProductDto) => ({
    data: {
        ...createData,
        categories: {
            connect: createData.categoryIds.map((category) => ({id: category}))
        },
    }
})

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: ProductDto) {
        return this.prismaService.product.create(createProductQuery(createData))
    }

    async createMany(createData: ProductDto[]) {
        return this.prismaService.$transaction([
            ...createData.map((product) => this.prismaService.product.create(createProductQuery(product)))
        ])
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
