import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  products = 'products',
  categories = 'categories'
}
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
      Prisma.ModelName.Product
    );
  };

  createMany = async (data: CategoryDto[]) =>
    this.manyToManyRelationCreateMany(
      data,
      relationNames.products,
      Prisma.ModelName.Product
    );

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
    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.Product,
      relationNames.categories
    );

    return this.prismaService.category.delete(findById(id));
  };

  removeAll = () => this.prismaService.category.deleteMany();
}
