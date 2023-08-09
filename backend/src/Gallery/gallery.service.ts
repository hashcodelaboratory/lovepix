import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GalleryDto } from "./dto/gallery.dto";

@Injectable()
export class GalleryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: GalleryDto) {
        if(Array.isArray(createData)) {
            createData.forEach(async (gallery) => {
                await this.prismaService.gallery.create({
                    data: {
                        ...gallery,
                        dimensions: {
                            connect: gallery.dimensionIDs.map((dimension) => ({id: dimension}))
                        },
                        gallery_categories: {
                            connect: gallery.gallery_categoryIDs.map((gallery_category) => ({id: gallery_category}))
                        }
                    }
                })
            })
            return createData;
        }
        else {
            return await this.prismaService.gallery.create({
                data: {
                    ...createData,
                    dimensions: {
                        connect: createData.dimensionIds.map((dimension) => ({id: dimension}))
                    },
                    galleryCategories: {
                        connect: createData.galleryCategoryIds.map((gallery_category) => ({id: gallery_category}))
                    }
                }
            })
        }
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