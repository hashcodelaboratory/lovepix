import {Injectable} from "@nestjs/common";
import {CategoryDto} from "./dto/category.dto";
import {findAllFromArray, findById} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

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

const adddRelationIdsQuery = (id: string, catId) => ({
  ...findById(id),
  data: {
    categoryIds: {
      push: catId
    }
  }
})

const deleteRelationIdsQuery = (id: string, ids: string[], catId: string) => ({
  ...findById(id),
  data: {
    categoryIds: {
      set: ids.filter((catIds) => catIds !== catId)
    }
  }
})

@Injectable()
export class CategoryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('Category', prismaService);
  }

  create = (data: CategoryDto) => this.prismaService.category.create({
    data
  })

  createMany = (data: CategoryDto[]) => this.prismaService.category.createMany({
    data
  })

  findAll = () => this.prismaService.category.findMany();

  findOne = (id: string) => this.prismaService.category.findUnique(findById(id));

  update = async (id: string, data: Partial<CategoryDto>) => {
    if(data.productIds) {
      const currentProductIds = (await (this.prismaService.category.findUnique(findById(id)))).productIds;
      const toAdd = data.productIds.filter((prod) => !currentProductIds.includes(prod));
      const toRemove = currentProductIds.filter((prod) => !data.productIds.includes(prod));
      const products = await this.prismaService.product.findMany(findAllFromArray(toRemove));
      
      await this.prismaService.$transaction([
        ...toAdd.map((prod) => this.prismaService.product.update(adddRelationIdsQuery(prod, id))),
        ...products.map((prod) => this.prismaService.product.update(deleteRelationIdsQuery(prod.id, prod.categoryIds, id)))
      ])
    }

    return this.prismaService.category.update({
      ...findById(id),
      data
    });
  }

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