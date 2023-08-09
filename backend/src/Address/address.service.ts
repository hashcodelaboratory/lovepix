import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddressDto } from "./dto/address.dto";

@Injectable()
export class AddressService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: AddressDto) {
        if(Array.isArray(createData)){
            return await this.prismaService.address.createMany({
                data: createData
            })
        }
        else{
            return await this.prismaService.address.create({
                data: createData
            });
        }
    }

    findAll() {
        return this.prismaService.address.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.address.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateData: Partial<AddressDto>) {
        return await this.prismaService.address.update({
            where: {
                id: id
            },
            data: updateData
        });
    }

    async remove(id: string) {
        return await this.prismaService.address.delete({
            where: {
                id: id
            }
        });
    }
}