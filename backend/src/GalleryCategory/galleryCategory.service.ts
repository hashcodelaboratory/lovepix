import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GalleryCategoryDto } from "./dto/galleryCategory.dto";
import { findById } from "../utils/query";

const findAllGalleriesQueryWithThatGalleryCategory = (id: string) => ({
    where: {
        galleryCategories: {
            some: {
                id: id
            }
        }
    }
})

const updateRelationsQueryOnDimensionDelete = (id: string, galleryCategoryIds: string[]) => ({
    galleryCategoryIds: {
        set: galleryCategoryIds.filter((galleryCategory) => galleryCategory !== id)
    }
})

@Injectable()
export class GalleryCategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: GalleryCategoryDto) {
        return await this.prismaService.galleryCategory.create({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.galleryCategory.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.galleryCategory.findUnique(findById(id));
    }

    async update(id: string, updateData: Partial<GalleryCategoryDto>) {
        return await this.prismaService.galleryCategory.update({
            ...findById(id),
            data: updateData
        });
    }

    async remove(id: string) {
        const galleries = await this.prismaService.gallery.findMany(findAllGalleriesQueryWithThatGalleryCategory(id));
        
        await this.prismaService.$transaction([
            ...galleries.map((gallery) => this.prismaService.gallery.update({
                ...findById(gallery.id),
                data: updateRelationsQueryOnDimensionDelete(id, gallery.galleryCategoryIds)
            }))
        ])
    }
}