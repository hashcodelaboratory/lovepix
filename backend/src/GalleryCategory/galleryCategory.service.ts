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

const addRelationIdsQuery = (id: string) => ({
  ...findById(id),
  data: {
    galleryCategoryIds: {
      push: id
    }
  }
})

const deleteRelationIdsQuery = (id: string, ids: string[], galCatId: string) => ({
  ...findById(id),
  data: {
    galleryCategoryIds: {
      set: ids.filter((galCatIds) => galCatIds !== galCatId)
    }
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
      const currentGalleryIds = (await (this.prismaService.galleryCategory.findUnique(findById(id)))).galleryIds;
      const toAdd = data.galleryIds.filter((gal) => !currentGalleryIds.includes(gal));
      const toRemove = currentGalleryIds.filter((gal) => !data.galleryIds.includes(gal));
      const galleries = await this.prismaService.gallery.findMany(findAllFromArray(toRemove));

      await this.prismaService.$transaction([
        ...toAdd.map((gal) => this.prismaService.gallery.update(addRelationIdsQuery(gal))),
        ...galleries.map((gal) => this.prismaService.gallery.update(deleteRelationIdsQuery(gal.id, gal.galleryCategoryIds, id)))
      ])
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