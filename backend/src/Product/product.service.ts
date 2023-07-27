import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto"; 
import { UpdateProductDto } from "./dto/update-product.dto";

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
                        connect: createProductDto.categoryIDs.map((category) => ({id: category}))
                    },
                }
            })
        }
    }

    findAll() {
        return this.prismaService.product.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.product.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return await this.prismaService.product.update({
            where: {
                id: id
            },
            data: updateProductDto
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
