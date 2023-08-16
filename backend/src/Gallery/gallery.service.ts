import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {GalleryDto} from "./dto/gallery.dto";
import {findById} from "src/utils/query";

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

@Injectable()
export class GalleryService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(gallery: GalleryDto) {
    return this.prismaService.gallery.create({
      data: {
        ...gallery,
        dimensions: {
          connect: gallery.dimensionIds.map((dimension) => ({id: dimension}))
        },
        galleryCategories: {
          connect: gallery.galleryCategoryIds.map((gallery_category) => ({id: gallery_category}))
        }
      }
    })
  }

  findAll() {
    return this.prismaService.gallery.findMany(findAllGalleriesQueryWithOrders);
  }

  async findOne(id: string) {
    return this.prismaService.gallery.findUnique(findById(id));
  }

  async update(id: string, updateData: Partial<GalleryDto>) {
    return this.prismaService.gallery.update({
      ...findById(id),
      data: updateData
    });
  }

  async remove(id: string) {
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

  async removeAll() {
    return this.prismaService.gallery.deleteMany({});
  }
}