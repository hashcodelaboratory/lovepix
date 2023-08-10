import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GalleryDto } from "./dto/gallery.dto";
import { findById } from "src/utils/query";

const findAllDimensionsQueryWithThatGallery = (id: string) => ({
    where: {
        galleries: {
            some: {
                id: id
            }
        }
    }
})

const findAllGalleryCategoriesQueryWithThatGallery = (id: string) => ({
    where: {
        galleries: {
            some: {
                id: id
            }
        }
    }
})

const updateRelationsQueryOnGalleryDelete = (id: string, galleryIds: string[]) => ({
    galleryIds: {
        set: galleryIds.filter((gallery) => gallery !== id)
    }
})

const findAllGalleriesQueryWithOrders = {
    include: {
        orders: true
    }
}

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
        return this.prismaService.gallery.findMany(findAllGalleriesQueryWithOrders);
    }

    async findOne(id: string) {
        return await this.prismaService.gallery.findUnique(findById(id));
    }

    async update(id: string, updateData: Partial<GalleryDto>) {
        return await this.prismaService.gallery.update({
            ...findById(id),
            data: updateData
        });
    }

    async remove(id: string) {
        const dimensions = await this.prismaService.dimension.findMany(findAllDimensionsQueryWithThatGallery(id));
        const galleryCategories = await this.prismaService.galleryCategory.findMany(findAllGalleryCategoriesQueryWithThatGallery(id));

        await this.prismaService.$transaction([
            ...dimensions.map((dimension) => this.prismaService.dimension.update({
                ...findById(dimension.id),
                data: updateRelationsQueryOnGalleryDelete(id, dimension.galleryIds)
            })),
            ...galleryCategories.map((galleryCategory) => this.prismaService.galleryCategory.update({
                ...findById(galleryCategory.id),
                data: updateRelationsQueryOnGalleryDelete(id, galleryCategory.galleryIds)
            })),
        ])


        return this.prismaService.gallery.delete(findById(id));
    }

    async removeAll() {
        return await this.prismaService.gallery.deleteMany({});
    }
}