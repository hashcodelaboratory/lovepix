import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { Prisma } from '@prisma/client';

enum RelationNames {
  categories = 'categories',
  products = 'products'
}
@Injectable()
export class ProductService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Product, prismaService);
  }

  create = async (data: ProductDto) => {
    const product = await this.prismaService.product.create({ data });
    return this.manyToManyRelationConnect(
      product,
      RelationNames.categories,
      Prisma.ModelName.Category
    );
  };

  createMany = async (data: ProductDto[]) =>
    this.manyToManyRelationCreateMany(
      data,
      RelationNames.categories,
      Prisma.ModelName.Category
    );

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
    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.Category,
      RelationNames.products
    );

    return this.prismaService.product.delete(findById(id));
  };

  removeAll = () => this.prismaService.product.deleteMany();
}
