import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: UserDto) {
        return this.prismaService.user.create({
            data: createData
        })
    }

    async createMany(createData: UserDto[]) {
        return this.prismaService.user.createMany({
            data: createData
        })
    }

    findAll() {
        return this.prismaService.user.findMany({
            include: {
                orders: true
            }
        });
    }


    async findOne(id: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<UserDto>) {
        return await this.prismaService.user.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.user.delete({
            where: {
                id: id
            }
        });
    }

    async findOrders(id: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id
            },
            include: {
                orders: true
            }
        });
    }

    async removeAll() {
        return await this.prismaService.user.deleteMany({});
    }
}