import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGalleryCategoryDto } from "./dto/create-galleryCategory.dto";
import { UpdateGalleryCategoryDto } from "./dto/update-galleryCategory.dto";
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

    async create(createGalleryCategoryDto: CreateGalleryCategoryDto) {
        return this.prismaService.galleryCategory.create({
            data: createGalleryCategoryDto
        })
    }

    findAll() {
        return this.prismaService.galleryCategory.findMany({
        });
    }

    async findOne(id: string) {
        return this.prismaService.galleryCategory.findUnique(findById(id));
    }

    async update(id: string, updateGalleryCategoryDto: UpdateGalleryCategoryDto) {
        return this.prismaService.galleryCategory.update({
            ...findById(id),
            data: updateGalleryCategoryDto
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

        return this.prismaService.galleryCategory.delete(findById(id));
    }
}