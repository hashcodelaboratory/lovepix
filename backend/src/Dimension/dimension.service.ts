import {Injectable} from "@nestjs/common";
import {DimensionDto} from "./dto/dimension.dto";
import {findAllFromArray, findById} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

const findAllGalleriesQueryWithThatDimension = (id: string) => ({
  where: {
    dimensions: {
      some: {
        id
      }
    }
  }
})

const updateRelationsQueryOnDimensionDelete = (id: string, dimensionIds: string[]) => ({
  dimensionIds: {
    set: dimensionIds.filter((dimensionId) => dimensionId !== id)
  }
})

const addRelationIdsQuery = (id: string) => ({
  ...findById(id),
  data: {
    dimensionIds: {
      push: id
    }
  }
})

const deleteRelationIdsQuery = (id: string, ids: string[], dimId: string) => ({
  ...findById(id),
  data: {
    dimensionIds: {
      set: ids.filter((dimIds) => dimIds !== dimId)
    }
  }
})

@Injectable()
export class DimensionService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('Dimension', prismaService);
  }

  create = (data: DimensionDto) => this.prismaService.dimension.create({
    data
  })

  createMany = (data: DimensionDto[]) => this.prismaService.dimension.createMany({
    data
  })

  findAll = () => this.prismaService.dimension.findMany();

  findOne = (id: string) => this.prismaService.dimension.findUnique(findById(id));

  update = async (id: string, data: Partial<DimensionDto>) => {
    if(data.galleryIds) {
      const currentGalleryIds = (await (this.prismaService.dimension.findUnique(findById(id)))).galleryIds;
      const toAdd = data.galleryIds.filter((gal) => !currentGalleryIds.includes(gal));
      const toRemove = currentGalleryIds.filter((gal) => !data.galleryIds.includes(gal));
      const galleries = await this.prismaService.gallery.findMany(findAllFromArray(toRemove));

      await this.prismaService.$transaction([
        ...toAdd.map((gal) => this.prismaService.gallery.update(addRelationIdsQuery(gal))),
        ...galleries.map((gal) => this.prismaService.gallery.update(deleteRelationIdsQuery(gal.id, gal.dimensionIds, id)))
      ])
    }

    return this.prismaService.dimension.update({
      ...findById(id),
      data
    });
  }

  remove = async (id: string) => {
    const galleries = await this.prismaService.gallery.findMany(findAllGalleriesQueryWithThatDimension(id));

    await this.prismaService.$transaction(galleries.map((gallery) => this.prismaService.gallery.update({
        ...findById(gallery.id),
        data: updateRelationsQueryOnDimensionDelete(id, gallery.dimensionIds)
      }))
    )

    return this.prismaService.dimension.delete(findById(id));
  }

  removeAll = () => this.prismaService.dimension.deleteMany();
}