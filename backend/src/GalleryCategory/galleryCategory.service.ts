import {Injectable} from "@nestjs/common";
import {GalleryCategoryDto} from "./dto/galleryCategory.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

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

const updateIdsQuery = (id: string, Ids: string[]) => ({
  where: {
    id: {
      in: Ids
    }
  },
  data: {
    galleryCategoryIds: {
      push: id
    }
  }
})

@Injectable()
export class GalleryCategoryService extends BaseService {
  create = (data: GalleryCategoryDto) => this.prismaService.galleryCategory.create({
    data
  })

  createMany = (data: GalleryCategoryDto[]) => this.prismaService.galleryCategory.createMany({
    data
  })

  findAll = () => this.prismaService.galleryCategory.findMany({});

  findOne = (id: string) => this.prismaService.galleryCategory.findUnique(findById(id));

  update = (id: string, data: Partial<GalleryCategoryDto>) => {
    if(data.galleryIds) {
      this.prismaService.gallery.findMany(findAllGalleriesQueryWithThatGalleryCategory(id))
        .then((galleries) => this.prismaService.$transaction([
          ...galleries.map((gallery) => this.prismaService.gallery.update({
            ...findById(gallery.id),
            data: updateRelationsQueryOnDimensionDelete(id, gallery.galleryCategoryIds)
          })),
          this.prismaService.gallery.updateMany(updateIdsQuery(id, data.galleryIds))
        ]))
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