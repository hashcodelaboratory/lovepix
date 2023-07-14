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

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}