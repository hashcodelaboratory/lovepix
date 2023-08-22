import {Injectable} from "@nestjs/common";
import {GalleryDto} from "./dto/gallery.dto";
import {findById} from "src/utils/query";
import {findAllFromArray} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

const findByGalleryId = (id: string) => ({
  where: {
    galleries: {
      some: {
        id
      }
    }
  }
})

const updateRelationsQueryOnGalleryDelete = (id: string, galleryIds: string[]) => ({
  galleryIds: {
    set: galleryIds.filter((gallery) => gallery !== id)
  }
})

const findAllGalleriesQueryWithOrders = {
  include: {
    orders: true
  }
}

const createGalleryQuery = (data: GalleryDto) => ({
  data: {
    ...data,
    dimensions: {
      connect: data.dimensionIds.map((dimension) => ({id: dimension}))
    },
    galleryCategories: {
      connect: data.galleryCategoryIds.map((galleryCategory) => ({id: galleryCategory}))
    }
  }
})

const addRelationIdsQuery = (id: string) => ({
  ...findById(id),
  data: {
    galleryIds: {
      push: id
    }
  }
})

const deleteRelationIdsQuery = (id: string, ids: string[], galId: string) => ({
  ...findById(id),
  data: {
    galleryIds: {
      set: ids.filter((galIds) => galIds !== galId)
    }
  }
})


@Injectable()
export class GalleryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('Gallery', prismaService);
  }

  create = (data: GalleryDto) => this.prismaService.gallery.create(createGalleryQuery(data))

  createMany = (data: GalleryDto[]) => this.prismaService.$transaction(data.map(this.create))

  findAll = () => this.prismaService.gallery.findMany(findAllGalleriesQueryWithOrders);

  findOne = (id: string) => this.prismaService.gallery.findUnique(findById(id));

  update = async (id: string, data: Partial<GalleryDto>) => {
    if(data.dimensionIds) {
      const currentDimensionIds = (await (this.prismaService.gallery.findUnique(findById(id)))).dimensionIds;
      const toAdd = data.dimensionIds.filter((dim) => !currentDimensionIds.includes(dim));
      const toRemove = currentDimensionIds.filter((dim) => !data.dimensionIds.includes(dim));
      const dimensions = await this.prismaService.dimension.findMany(findAllFromArray(toRemove));

      await this.prismaService.$transaction([
        ...toAdd.map((dim) => this.prismaService.dimension.update(addRelationIdsQuery(dim))),
        ...dimensions.map((dim) => this.prismaService.dimension.update(deleteRelationIdsQuery(dim.id, dim.galleryIds, id)))
      ])
    }
    if(data.galleryCategoryIds) {
      const currentGalleryCategoryIds = (await (this.prismaService.gallery.findUnique(findById(id)))).galleryCategoryIds;
      const toAdd = data.galleryCategoryIds.filter((galCat) => !currentGalleryCategoryIds.includes(galCat));
      const toRemove = currentGalleryCategoryIds.filter((galCat) => !data.galleryCategoryIds.includes(galCat));
      const galleryCategories = await this.prismaService.galleryCategory.findMany(findAllFromArray(toRemove));

      await this.prismaService.$transaction([
        ...toAdd.map((galCat) => this.prismaService.galleryCategory.update(addRelationIdsQuery(galCat))),
        ...galleryCategories.map((galCat) => this.prismaService.galleryCategory.update(deleteRelationIdsQuery(galCat.id ,galCat.galleryIds, id)))
      ])
    }
    
    return this.prismaService.gallery.update({
      ...findById(id),
      data
    });
  }

  remove = async (id: string) => {
    const dimensions = await this.prismaService.dimension.findMany(findByGalleryId(id));
    const galleryCategories = await this.prismaService.galleryCategory.findMany(findByGalleryId(id));

    await this.prismaService.$transaction([
      ...dimensions.map((dimension) => this.prismaService.dimension.update({
        ...findById(dimension.id),
        data: updateRelationsQueryOnGalleryDelete(id, dimension.galleryIds)
      })),
      ...galleryCategories.map((galleryCategory) => this.prismaService.galleryCategory.update({
        ...findById(galleryCategory.id),
        data: updateRelationsQueryOnGalleryDelete(id, galleryCategory.galleryIds)
      })),
    ])

    return this.prismaService.gallery.delete(findById(id));
  }

  removeAll = () => this.prismaService.gallery.deleteMany();
}