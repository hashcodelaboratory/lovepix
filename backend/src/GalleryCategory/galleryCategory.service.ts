import { Injectable } from '@nestjs/common';
import { GalleryCategoryDto } from './dto/galleryCategory.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum RelationNames {
  galleries = 'galleries',
  galleryCategories = 'galleryCategories'
}
@Injectable()
export class GalleryCategoryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.GalleryCategory, prismaService);
  }

  create = async (data: GalleryCategoryDto) => {
    const galleryCategory = await this.prismaService.galleryCategory.create({
      data
    });
    return this.manyToManyRelationConnect(
      galleryCategory,
      RelationNames.galleries,
      Prisma.ModelName.Gallery
    );
  };

  createMany = async (data: GalleryCategoryDto[]) =>
    this.manyToManyRelationCreateMany(
      data,
      RelationNames.galleries,
      Prisma.ModelName.Gallery
    );

  findAll = () => this.prismaService.galleryCategory.findMany({});

  findOne = (id: string) =>
    this.prismaService.galleryCategory.findUnique(findById(id));

  update = async (id: string, data: Partial<GalleryCategoryDto>) => {
    if (data.galleryIds) {
      await this.updateRelationIds(
        id,
        data.galleryIds,
        Prisma.ModelName.Gallery
      );
    }
    return this.prismaService.galleryCategory.update({
      ...findById(id),
      data
    });
  };

  remove = async (id: string) => {
    this.manyToMayRelationDelete(
      id,
      Prisma.ModelName.Gallery,
      RelationNames.galleryCategories
    );

    return this.prismaService.galleryCategory.delete(findById(id));
  };

  removeAll = () => this.prismaService.gallery.deleteMany();
}
