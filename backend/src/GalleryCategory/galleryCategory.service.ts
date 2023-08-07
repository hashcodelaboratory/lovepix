import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGalleryCategoryDto } from "./dto/create-galleryCategory.dto";
import { UpdateGalleryCategoryDto } from "./dto/update-galleryCategory.dto";

@Injectable()
export class GalleryCategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createGalleryCategoryDto: CreateGalleryCategoryDto) {
        return await this.prismaService.galleryCategory.create({
            data: createGalleryCategoryDto
        })
    }

    findAll() {
        return this.prismaService.galleryCategory.findMany({
            include: {
                galleries: true
            }
        });
    }

    async findOne(id: string) {
        return await this.prismaService.galleryCategory.findUnique({
            where: {
                id: id
            },
            include: {
                galleries: true
            }
        });
    }

    async update(id: string, updateGalleryCategoryDto: UpdateGalleryCategoryDto) {
        return await this.prismaService.galleryCategory.update({
            where: {
                id: id
            },
            data: updateGalleryCategoryDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.galleryCategory.delete({
            where: {
                id: id
            }
        });
    }
}