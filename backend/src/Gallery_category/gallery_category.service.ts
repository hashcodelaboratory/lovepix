import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGallery_categoryDto } from "./dto/create-gallery_category.dto";
import { UpdateGallery_categoryDto } from "./dto/update-gallery_category.dto";

@Injectable()
export class GalleryCategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createGalleryCategoryDto: CreateGallery_categoryDto) {
        return await this.prismaService.gallery_category.create({
            data: createGalleryCategoryDto
        })
    }

    findAll() {
        return this.prismaService.gallery_category.findMany({
            include: {
                galleries: true
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.gallery_category.findUnique({
            where: {
                id: id
            },
            include: {
                galleries: true
            }
        });
    }

    async update(id: string, updateGalleryCategoryDto: UpdateGallery_categoryDto) {
        return await this.prismaService.gallery_category.update({
            where: {
                id: id
            },
            data: updateGalleryCategoryDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.gallery_category.delete({
            where: {
                id: id
            }
        });
    }
}