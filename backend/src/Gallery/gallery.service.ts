import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { UpdateGalleryDto } from "./dto/update-gallery.dto";
import { UpdateDimensionDto } from "src/Dimension/dto/update-dimension.dto";
import { UpdateGallery_categoryDto } from "src/Gallery_category/dto/update-gallery_category.dto";

@Injectable()
export class GalleryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createGalleryDto: CreateGalleryDto) {
        if(Array.isArray(createGalleryDto)){
            return await this.prismaService.gallery.createMany({
                data: createGalleryDto
            })
        }
        else{
            return await this.prismaService.gallery.create({
                data: createGalleryDto
            })
        }
    }

    findAll() {
        return this.prismaService.gallery.findMany({
            include: {
                dimensions: true,
                gallery_categories: true
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