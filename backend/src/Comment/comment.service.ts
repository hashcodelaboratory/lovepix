import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCommentDto: CreateCommentDto) {
        return await this.prismaService.comment.create({
            data: createCommentDto
        })
    }

    findAll() {
        return this.prismaService.comment.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.comment.findUnique({
            where: {
                id: id
            }
        });
    }

    async remove(id: string) {
        return await this.prismaService.comment.delete({
            where: {
                id: id
            }
        });
    }
}