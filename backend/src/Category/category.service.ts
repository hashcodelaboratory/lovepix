import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  products = 'products',
  productIds = 'productIds'
}

const findAllProductsQueryWithThatCategory = (id: string) => ({
  where: {
    categories: {
      some: {
        id
      }
    }
  }
});

const updateRelationsQueryOnCategoryDelete = (
  id: string,
  categoryIds: string[]
) => ({
  categoryIds: {
    set: categoryIds.filter((categoryId) => categoryId !== id)
  }
});

@Injectable()
export class CategoryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Category, prismaService);
  }

  create = async (data: CategoryDto) => {
    const cat = await this.prismaService.category.create({ data });
    return this.manyToManyRelationConnect(
      cat,
      relationNames.products,
      relationNames.productIds
    );
  };

  createMany = (data: CategoryDto[]) => data.map(this.create);

  findAll = () => this.prismaService.category.findMany();

  findOne = (id: string) =>
    this.prismaService.category.findUnique(findById(id));

  update = async (id: string, data: Partial<CategoryDto>) => {
    if (data.productIds) {
      await this.updateRelationIds(
        id,
        data.productIds,
        Prisma.ModelName.Product
      );
    }

    return this.prismaService.category.update({
      ...findById(id),
      data
    });
  };

  remove = async (id: string) => {
    const products = await this.prismaService.product.findMany(
      findAllProductsQueryWithThatCategory(id)
    );

    await this.prismaService.$transaction(
      products.map((product) =>
        this.prismaService.product.update({
          ...findById(product.id),
          data: updateRelationsQueryOnCategoryDelete(id, product.categoryIds)
        })
      )
    );

    return this.prismaService.category.delete(findById(id));
  };

  removeAll = () => this.prismaService.category.deleteMany();
}
