import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {DimensionDto} from "./dto/dimension.dto";
import {findById} from "../utils/query";

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
export class DimensionService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createData: DimensionDto) {
    return this.prismaService.dimension.create({
      data: createData
    })
  }

  findAll() {
    return this.prismaService.dimension.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.dimension.findUnique(findById(id));
  }

  async update(id: string, updateData: Partial<DimensionDto>) {
    return this.prismaService.dimension.update({
      ...findById(id),
      data: updateData
    });
  }

  async remove(id: string) {
    const galleries = await this.prismaService.gallery.findMany(findAllGalleriesQueryWithThatDimension(id));

    await this.prismaService.$transaction([
      ...galleries.map((gallery) => this.prismaService.gallery.update({
        ...findById(gallery.id),
        data: updateRelationsQueryOnDimensionDelete(id, gallery.dimensionIds)
      }))
    ])

    return this.prismaService.dimension.delete(findById(id));
  }

  async removeAll() {
    return this.prismaService.dimension.deleteMany();
  }
}