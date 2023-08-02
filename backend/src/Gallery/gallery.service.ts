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
                        connect: createGalleryDto.dimensionIDs.map((dimension) => ({id: dimension}))
                    },
                    gallery_categories: {
                        connect: createGalleryDto.gallery_categoryIDs.map((gallery_category) => ({id: gallery_category}))
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