import { Injectable } from '@nestjs/common';
import { GalleryDto } from './dto/gallery.dto';
import { findById } from 'src/utils/query';
import { findAllFromArray } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum RelationNames {
  dimensions = 'dimensions',
  galleryCategories = 'galleryCategories',
  galleries = 'galleries'
}
@Injectable()
export class GalleryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Gallery, prismaService);
  }

  create = async (data: GalleryDto) => {
    const gal = await this.prismaService.gallery.create({ data });
    await this.manyToManyRelationConnect(
      gal,
      RelationNames.dimensions,
      Prisma.ModelName.Dimension
    );
    await this.manyToManyRelationConnect(
      gal,
      RelationNames.galleryCategories,
      Prisma.ModelName.GalleryCategory
    );
  };

  createMany = async (data: GalleryDto[]) =>
    this.manyToManyRelationCreateMany(
      data,
      RelationNames.dimensions,
      Prisma.ModelName.Dimension
    );

  findAll = () => this.prismaService.gallery.findMany();

  findOne = (id: string) => this.prismaService.gallery.findUnique(findById(id));

  update = async (id: string, data: Partial<GalleryDto>) => {
    if (data.dimensionIds) {
      await this.updateRelationIds(
        id,
        data.dimensionIds,
        Prisma.ModelName.Dimension
      );
    }
    if (data.galleryCategoryIds) {
      await this.updateRelationIds(
        id,
        data.galleryCategoryIds,
        Prisma.ModelName.GalleryCategory
      );
    }

    return this.prismaService.gallery.update({
      ...findById(id),
      data
    });
  };

  remove = async (id: string) => {
    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.Dimension,
      RelationNames.galleries
    );

    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.GalleryCategory,
      RelationNames.galleries
    );

    return this.prismaService.gallery.delete(findById(id));
  };

  removeAll = () => this.prismaService.gallery.deleteMany();
}
