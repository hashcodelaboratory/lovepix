import { Injectable } from '@nestjs/common';
import { DimensionDto } from './dto/dimension.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  galleries = 'galleries',
  galleryIds = 'galleryIds'
}

const findAllGalleriesQueryWithThatDimension = (id: string) => ({
  where: {
    dimensions: {
      some: {
        id
      }
    }
  }
});

const updateRelationsQueryOnDimensionDelete = (
  id: string,
  dimensionIds: string[]
) => ({
  dimensionIds: {
    set: dimensionIds.filter((dimensionId) => dimensionId !== id)
  }
});

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
      relationNames.galleryIds
    );
  };

  createMany = (data: DimensionDto[]) => data.map(this.create);

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
    const galleries = await this.prismaService.gallery.findMany(
      findAllGalleriesQueryWithThatDimension(id)
    );

    await this.prismaService.$transaction(
      galleries.map((gallery) =>
        this.prismaService.gallery.update({
          ...findById(gallery.id),
          data: updateRelationsQueryOnDimensionDelete(id, gallery.dimensionIds)
        })
      )
    );

    return this.prismaService.dimension.delete(findById(id));
  };

  removeAll = () => this.prismaService.dimension.deleteMany();
}
