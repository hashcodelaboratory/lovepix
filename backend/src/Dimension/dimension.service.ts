import {Injectable} from "@nestjs/common";
import {DimensionDto} from "./dto/dimension.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

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

@Injectable()
export class DimensionService extends BaseService {
  create = (data: DimensionDto) => this.prismaService.dimension.create({
    data
  })

  createMany = (data: DimensionDto[]) => this.prismaService.dimension.createMany({
    data
  })

  findAll = () => this.prismaService.dimension.findMany();

  findOne = (id: string) => this.prismaService.dimension.findUnique(findById(id));

  update = (id: string, data: Partial<DimensionDto>) => this.prismaService.dimension.update({
    ...findById(id),
    data
  });

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