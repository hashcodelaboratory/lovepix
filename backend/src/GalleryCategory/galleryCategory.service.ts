import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GalleryCategoryDto } from "./dto/galleryCategory.dto";

@Injectable()
export class GalleryCategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: GalleryCategoryDto) {
        return await this.prismaService.galleryCategory.create({
            data: createData
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

    async update(id: string, updateData: Partial<GalleryCategoryDto>) {
        return await this.prismaService.galleryCategory.update({
            where: {
                id: id
            },
            data: updateData
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