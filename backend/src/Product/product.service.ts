import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ProductDto} from "./dto/product.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

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

const createProductQuery = (data: ProductDto) => ({
  data: {
    ...data,
    categories: {
      connect: data.categoryIds.map((category) => ({id: category}))
    },
  }
})

const updateRelationIdsQuery = (id: string, Ids: string[]) => ({
  where: {
    id: {
      in: Ids
    }
  },
  data: {
    productIds: {
      push: id
    }
  }
})

@Injectable()
export class ProductService extends BaseService {
  create = (data: ProductDto) => this.prismaService.product.create(createProductQuery(data))

  createMany = (data: ProductDto[]) => this.prismaService.$transaction(data.map(this.create))

  findAll = () => this.prismaService.product.findMany({
    include: {
      orders: true,
    }
  });

  findOne = (id: string) => this.prismaService.product.findUnique(findById(id));

  update = (id: string, data: Partial<ProductDto>) => {
    if(data.categoryIds) {
      this.prismaService.category.findMany(findAllCategoriesQueryWithThatProduct(id))
        .then((categories) => this.prismaService.$transaction([
          ...categories.map((category) => this.prismaService.category.update({
            ...findById(category.id),
            data: updateRelationsQueryOnProductDelete(id, category.productIds)
          })),
          this.prismaService.category.updateMany(updateRelationIdsQuery(id, data.categoryIds))
        ]))
    }
    return this.prismaService.product.update({
      ...findById(id),
      data: data
    });
  }


  remove = async (id: string) => {
    const categories = await this.prismaService.category.findMany(findAllCategoriesQueryWithThatProduct(id));

    return this.prismaService.$transaction([
        ...categories.map((category) => this.prismaService.category.update({
          ...findById(category.id),
          data: updateRelationsQueryOnProductDelete(id, category.productIds)
        })),
        this.prismaService.product.delete(findById(id))
      ]
    )
  }

  removeAll = () => this.prismaService.product.deleteMany();
}
