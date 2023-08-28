import { Injectable } from '@nestjs/common';
import { GalleryCategoryDto } from './dto/galleryCategory.dto';
import { findAllFromArray, findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum relationNames {
  galleries = 'galleries',
  galleryCategories = 'galleryCategories'
}
@Injectable()
export class GalleryCategoryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.GalleryCategory, prismaService);
  }

  create = async (data: GalleryCategoryDto) =>
    this.manyToManyRelationCreateMany(
      data,
      relationNames.galleries,
      Prisma.ModelName.Gallery
    );

  createMany = async (data: GalleryCategoryDto[]) => {
    const galleryCategories = await this.prismaService.$transaction(
      data.map((galleryCategory) =>
        this.prismaService.galleryCategory.create({ data: galleryCategory })
      )
    );
    await this.prismaService.$transaction(
      galleryCategories.map((galCat) =>
        this.manyToManyRelationConnect(
          galCat,
          relationNames.galleries,
          Prisma.ModelName.Gallery
        )
      )
    );
    return galleryCategories;
  };

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
      relationNames.galleryCategories
    );

    return this.prismaService.galleryCategory.delete(findById(id));
  };

  removeAll = () => this.prismaService.gallery.deleteMany();
}
