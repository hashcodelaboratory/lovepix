import { Injectable } from '@nestjs/common';
import { DimensionDto } from './dto/dimension.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  galleries = 'galleries',
  dimensions = 'dimensions'
}

@Injectable()
export class DimensionService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Dimension, prismaService);
  }

  create = async (data: DimensionDto) => {
    const dim = await this.prismaService.dimension.create({ data });
    return this.manyToManyRelationConnect(
      dim,
      relationNames.galleries,
      Prisma.ModelName.Gallery
    );
  };

  createMany = async (data: DimensionDto[]) =>
    this.manyToManyRelationCreateMany(
      data,
      relationNames.galleries,
      Prisma.ModelName.Gallery
    );

  findAll = () => this.prismaService.dimension.findMany();

  findOne = (id: string) =>
    this.prismaService.dimension.findUnique(findById(id));

  update = async (id: string, data: Partial<DimensionDto>) => {
    if (data.galleryIds) {
      this.updateRelationIds(id, data.galleryIds, Prisma.ModelName.Gallery);
    }

    return this.prismaService.dimension.update({
      ...findById(id),
      data
    });
  };

  remove = async (id: string) => {
    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.Gallery,
      relationNames.dimensions
    );

    return this.prismaService.dimension.delete(findById(id));
  };

  removeAll = () => this.prismaService.dimension.deleteMany();
}
