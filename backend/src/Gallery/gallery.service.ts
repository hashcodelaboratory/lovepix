import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GalleryDto } from "./dto/gallery.dto";

const createGalleryQuery = (createData: GalleryDto) => ({
    data: {
        ...createData,
        dimensions: {
            connect: createData.dimensionIds.map((dimension) => ({id: dimension}))
        },
        galleryCategories: {
            connect: createData.galleryCategoryIds.map((galleryCategory) => ({id: galleryCategory}))
        }
    }
})

@Injectable()
export class GalleryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: GalleryDto) {
        return this.prismaService.gallery.create(createGalleryQuery(createData))
    }

    async createMany(createData: GalleryDto[]) {
        return this.prismaService.$transaction([
            ...createData.map((gallery) => this.prismaService.gallery.create(createGalleryQuery(gallery)))
        ])
    }

    findAll() {
        return this.prismaService.gallery.findMany({
            include: {
                orders: true,
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.gallery.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<GalleryDto>) {
        return await this.prismaService.gallery.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.gallery.delete({
            where: {
                id: id
            }
        });
    }

    async removeAll() {
        return await this.prismaService.gallery.deleteMany({});
    }
}