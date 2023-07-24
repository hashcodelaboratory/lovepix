import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { UpdateGalleryDto } from "./dto/update-gallery.dto";

@Injectable()
export class GalleryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createGalleryDto: CreateGalleryDto) {
        return await this.prismaService.gallery.create({
            data: createGalleryDto
        })
    }

    findAll() {
        return this.prismaService.gallery.findMany();
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
}