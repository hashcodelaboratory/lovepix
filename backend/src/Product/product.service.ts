import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  categories = 'categories',
  categoryIds = 'categoryIds'
}

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
    super(Prisma.ModelName.Product, prismaService);
  }

  create = async (data: ProductDto) => {
    const prod = await this.prismaService.product.create({ data });
    return this.manyToManyRelationConnect(
      prod,
      relationNames.categories,
      relationNames.categoryIds
    );
  };

  createMany = (data: ProductDto[]) => data.map(this.create);

  findAll = () =>
    this.prismaService.product.findMany({
      include: {
        orders: true
      }
    });

  findOne = (id: string) => this.prismaService.product.findUnique(findById(id));

  update = async (id: string, data: Partial<ProductDto>) => {
    if (data.categoryIds) {
      await this.updateRelationIds(
        id,
        data.categoryIds,
        Prisma.ModelName.Category
      );
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
