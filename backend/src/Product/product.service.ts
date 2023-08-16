import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ProductDto} from "./dto/product.dto";
import {findById} from "../utils/query";

const findAllCategoriesQueryWithThatProduct = (id: string) => ({
  where: {
    products: {
      some: {
        id
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
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(product: ProductDto) {
    return this.prismaService.product.create({
      data: {
        ...product,
        categories: {
          connect: product.categoryIds.map((category) => ({id: category}))
        },
      }
    })
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

  async update(id: string, updateData: Partial<ProductDto>) {
    return this.prismaService.product.update({
      ...findById(id),
      data: updateData
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
    return this.prismaService.product.deleteMany({});
  }
}
