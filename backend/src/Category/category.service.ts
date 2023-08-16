import {Injectable} from "@nestjs/common";
import {CategoryDto} from "./dto/category.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

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
export class CategoryService extends BaseService {
  create = (data: CategoryDto) => this.prismaService.category.create({
    data
  })

  createMany = (data: CategoryDto[]) => this.prismaService.category.createMany({
    data
  })

  findAll = () => this.prismaService.category.findMany();

  findOne = (id: string) => this.prismaService.category.findUnique(findById(id));

  update = (id: string, data: Partial<CategoryDto>) => this.prismaService.category.update({
    ...findById(id),
    data
  });

  remove = async (id: string) => {
    const products = await this.prismaService.product.findMany(findAllProductsQueryWithThatCategory(id));

    await this.prismaService.$transaction(products.map((product) => this.prismaService.product.update({
        ...findById(product.id),
        data: updateRelationsQueryOnCategoryDelete(id, product.categoryIds)
      })),
    )

    return this.prismaService.category.delete(findById(id));
  }

  removeAll = () => this.prismaService.category.deleteMany();
}