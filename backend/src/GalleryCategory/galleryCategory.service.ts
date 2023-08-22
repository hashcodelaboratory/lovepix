import {Injectable} from "@nestjs/common";
import {GalleryCategoryDto} from "./dto/galleryCategory.dto";
import {findAllFromArray, findById} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

const findAllGalleriesQueryWithThatGalleryCategory = (id: string) => ({
  where: {
    galleryCategories: {
      some: {
        id
      }
    }
  }
})

const updateRelationsQueryOnDimensionDelete = (id: string, galleryCategoryIds: string[]) => ({
  galleryCategoryIds: {
    set: galleryCategoryIds.filter((galleryCategory) => galleryCategory !== id)
  }
})

@Injectable()
export class GalleryCategoryService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('GalleryCategory', prismaService);
  }

  create = (data: GalleryCategoryDto) => this.prismaService.galleryCategory.create({
    data
  })

  createMany = (data: GalleryCategoryDto[]) => this.prismaService.galleryCategory.createMany({
    data
  })

  findAll = () => this.prismaService.galleryCategory.findMany({});

  findOne = (id: string) => this.prismaService.galleryCategory.findUnique(findById(id));

  update = async (id: string, data: Partial<GalleryCategoryDto>) => {
    if(data.galleryIds) {
      await this.updateRelationIds(id, data.galleryIds, 'Gallery');
    }
    return this.prismaService.galleryCategory.update({
      ...findById(id),
      data
    });
  }

  remove = async (id: string) => {
    const galleries = await this.prismaService.gallery.findMany(findAllGalleriesQueryWithThatGalleryCategory(id));

    await this.prismaService.$transaction(galleries.map((gallery) => this.prismaService.gallery.update({
        ...findById(gallery.id),
        data: updateRelationsQueryOnDimensionDelete(id, gallery.galleryCategoryIds)
      }))
    )
  }

  removeAll = () => this.prismaService.gallery.deleteMany()
}