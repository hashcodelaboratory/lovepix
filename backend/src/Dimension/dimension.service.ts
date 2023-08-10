import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDimensionDto } from "./dto/create-dimension.dto";
import { UpdateDimensionDto } from "./dto/update-dimension.dto";
import { findById } from "../utils/query";

const findAllGalleriesQueryWithThatDimension = (id: string) => ({
    where: {
        dimensions: {
            some: {
                id: id
            }
        }
    }
})

const updateRelationsQueryOnDimensionDelete = (id: string, dimensionIds: string[]) => ({
    dimensionIds: {
        set: dimensionIds.filter((dimension) => dimension !== id)
    }
})

@Injectable()
export class DimensionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createDimensionDto: CreateDimensionDto) {
        return this.prismaService.dimension.create({
            data: createDimensionDto
        })
    }

    findAll() {
        return this.prismaService.dimension.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.dimension.findUnique(findById(id));
    }

    async update(id: string, updateDimensionDto: UpdateDimensionDto) {
        return this.prismaService.dimension.update({
            ...findById(id),
            data: updateDimensionDto
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