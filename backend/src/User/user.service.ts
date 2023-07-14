import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return await this.prismaService.user.create({
            data: createUserDto
        })
    }

    findAll() {
        return this.prismaService.user.findMany();
    }


    async findOne(id: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.prismaService.user.update({
            where: {
                id: id
            },
            data: updateUserDto
        });
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    async remove(id: string) {
        return await this.prismaService.user.delete({
            where: {
                id: id
            }
        });
    }
}