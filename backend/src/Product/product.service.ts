import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';

const createProductQuery = (data: ProductDto) => ({
  data: {
    ...data,
    categories: {
      connect: data.categoryIds.map((category) => ({ id: category }))
    }
  }
});

const findAllCategoriesQueryWithThatProduct = (id: string) => ({
  where: {
    products: {
      some: {
        id
      }
    }
  }
});

const updateRelationsQueryOnProductDelete = (
  id: string,
  productIds: string[]
) => ({
  productIds: {
    set: productIds.filter((product) => product !== id)
  }
});

@Injectable()
export class ProductService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('Product', prismaService);
  }

  create = (data: ProductDto) =>
    this.prismaService.product.create(createProductQuery(data));
  //this.manyToManyCreate(data, 'categories', 'categoryIds');

  createMany = (data: ProductDto[]) =>
    this.prismaService.$transaction(data.map(this.create));

  findAll = () =>
    this.prismaService.product.findMany({
      include: {
        orders: true
      }
    });

  findOne = (id: string) => this.prismaService.product.findUnique(findById(id));

  update = async (id: string, data: Partial<ProductDto>) => {
    if (data.categoryIds) {
      await this.updateRelationIds(id, data.categoryIds, 'Category');
    }

    return this.prismaService.product.update({
      ...findById(id),
      data: data
    });
  };

  remove = async (id: string) => {
    const categories = await this.prismaService.category.findMany(
      findAllCategoriesQueryWithThatProduct(id)
    );

    return this.prismaService.$transaction([
      ...categories.map((category) =>
        this.prismaService.category.update({
          ...findById(category.id),
          data: updateRelationsQueryOnProductDelete(id, category.productIds)
        })
      ),
      this.prismaService.product.delete(findById(id))
    ]);
  };

  removeAll = () => this.prismaService.product.deleteMany();
}
