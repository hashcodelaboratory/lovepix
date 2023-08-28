import { Injectable } from '@nestjs/common';
import { GalleryDto } from './dto/gallery.dto';
import { findById } from 'src/utils/query';
import { findAllFromArray } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

const findByGalleryId = (id: string) => ({
  where: {
    galleries: {
      some: {
        id
      }
    }
  }
});

const updateRelationsQueryOnGalleryDelete = (
  id: string,
  galleryIds: string[]
) => ({
  galleryIds: {
    set: galleryIds.filter((gallery) => gallery !== id)
  }
});

const findAllGalleriesQueryWithOrders = {
  include: {
    orders: true
  }
};

const createGalleryQuery = (data: GalleryDto) => ({
  data: {
    ...data,
    dimensions: {
      connect: data.dimensionIds.map((dimension) => ({ id: dimension }))
    },
    galleryCategories: {
      connect: data.galleryCategoryIds.map((galleryCategory) => ({
        id: galleryCategory
      }))
    }
  }
});

@Injectable()
export class GalleryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Gallery, prismaService);
  }

  create = (data: GalleryDto) =>
    this.prismaService.gallery.create(createGalleryQuery(data));

  createMany = (data: GalleryDto[]) =>
    this.prismaService.$transaction(data.map(this.create));

  findAll = () =>
    this.prismaService.gallery.findMany(findAllGalleriesQueryWithOrders);

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
    const dimensions = await this.prismaService.dimension.findMany(
      findByGalleryId(id)
    );
    const galleryCategories = await this.prismaService.galleryCategory.findMany(
      findByGalleryId(id)
    );

    await this.prismaService.$transaction([
      ...dimensions.map((dimension) =>
        this.prismaService.dimension.update({
          ...findById(dimension.id),
          data: updateRelationsQueryOnGalleryDelete(id, dimension.galleryIds)
        })
      ),
      ...galleryCategories.map((galleryCategory) =>
        this.prismaService.galleryCategory.update({
          ...findById(galleryCategory.id),
          data: updateRelationsQueryOnGalleryDelete(
            id,
            galleryCategory.galleryIds
          )
        })
      )
    ]);

    return this.prismaService.gallery.delete(findById(id));
  };

  removeAll = () => this.prismaService.gallery.deleteMany();
}
