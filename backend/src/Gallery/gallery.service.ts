import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { UpdateGalleryDto } from "./dto/update-gallery.dto";

@Injectable()
export class GalleryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createGalleryDto: CreateGalleryDto) {
        if(Array.isArray(createGalleryDto)) {
            createGalleryDto.forEach(async (gallery) => {
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
            return createGalleryDto;
        }
        else {
            return await this.prismaService.gallery.create({
                data: {
                    ...createGalleryDto,
                    dimensions: {
                        connect: createGalleryDto.dimensionIds.map((dimension) => ({id: dimension}))
                    },
                    galleryCategories: {
                        connect: createGalleryDto.galleryCategoryIds.map((gallery_category) => ({id: gallery_category}))
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

    async update(id: string, updateGalleryDto: UpdateGalleryDto) {
        return await this.prismaService.gallery.update({
            where: {
                id: id
            },
            data: updateGalleryDto
        });
    }

    async remove(id: string) {
        const dimensions = await this.prismaService.dimension.findMany({
            where: {
                galleries: {
                    some: {
                        id: id
                    }
                }
            }
        });
        dimensions.forEach(async (dimension) => {
            await this.prismaService.dimension.update({
                where: {
                    id: dimension.id
                },
                data: {
                    galleryIds: {
                        set: dimension.galleryIds.filter((gallery) => gallery !== id)
                    }
                }
            })
        })
        const galleryCategories = await this.prismaService.galleryCategory.findMany({
            where: {
                galleries: {
                    some: {
                        id: id
                    }
                }
            }
        });
        galleryCategories.forEach(async (galleryCategory) => {
            await this.prismaService.galleryCategory.update({
                where: {
                    id: galleryCategory.id
                },
                data: {
                    galleryIds: {
                        set: galleryCategory.galleryIds.filter((gallery) => gallery !== id)
                    }
                }
            })
        })
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