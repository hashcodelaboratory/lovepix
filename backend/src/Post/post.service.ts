import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createPostDto: CreatePostDto) {
        return await this.prismaService.post.create({
            data: createPostDto
        })
    }

    findAll() {
        return this.prismaService.post.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.post.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        return await this.prismaService.post.update({
            where: {
                id: id
            },
            data: updatePostDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.post.delete({
            where: {
                id: id
            }
        });
    }
}