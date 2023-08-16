import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CategoryDto} from "./dto/category.dto";
import {findById} from "../utils/query";

const findAllProductsQueryWithThatCategory = (id: string) => ({
  where: {
    categories: {
      some: {
        id
      }
    }
  }
})

const updateRelationsQueryOnCategoryDelete = (id: string, categoryIds: string[]) => ({
  categoryIds: {
    set: categoryIds.filter((categoryId) => categoryId !== id)
  }
})

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createData: CategoryDto) {
    return this.prismaService.category.create({
      data: createData
    })
  }

  findAll() {
    return this.prismaService.category.findMany({});
  }

  async findOne(id: string) {
    return this.prismaService.category.findUnique(findById(id));
  }

  async update(id: string, updateData: Partial<CategoryDto>) {
    return this.prismaService.category.update({
      ...findById(id),
      data: updateData
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