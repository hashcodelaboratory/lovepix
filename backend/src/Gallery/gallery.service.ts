import {Injectable} from "@nestjs/common";
import {GalleryDto} from "./dto/gallery.dto";
import {findById} from "src/utils/query";
import {BaseService} from "../base.service";

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

const updateRelationIdsQuery = (id: string, Ids: string[]) => ({
  where: {
    id: {
      in: Ids
    }
  },
  data: {
    galleryIds: {
      push: id
    }
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

@Injectable()
export class GalleryService extends BaseService {
  create = (data: GalleryDto) => this.prismaService.gallery.create(createGalleryQuery(data))

  createMany = (data: GalleryDto[]) => this.prismaService.$transaction(data.map(this.create))

  findAll = () => this.prismaService.gallery.findMany(findAllGalleriesQueryWithOrders);

  findOne = (id: string) => this.prismaService.gallery.findUnique(findById(id));

  update = (id: string, data: Partial<GalleryDto>) => {
    if(data.dimensionIds) {
      this.prismaService.dimension.findMany(findByGalleryId(id))
        .then((dimensions) => this.prismaService.$transaction([
          ...dimensions.map((dimension) => this.prismaService.dimension.update({
            ...findById(dimension.id),
            data: updateRelationsQueryOnGalleryDelete(id, dimension.galleryIds)
          })),
          this.prismaService.dimension.updateMany(updateRelationIdsQuery(id, data.dimensionIds))
        ]))
    }
    if(data.galleryCategoryIds) {
      this.prismaService.galleryCategory.findMany(findByGalleryId(id))
        .then((galleryCategories) => this.prismaService.$transaction([
          ...galleryCategories.map((galleryCategory) => this.prismaService.galleryCategory.update({
            ...findById(galleryCategory.id),
            data: updateRelationsQueryOnGalleryDelete(id, galleryCategory.galleryIds)
          })),
          this.prismaService.galleryCategory.updateMany(updateRelationIdsQuery(id, data.galleryCategoryIds))
        ]))
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