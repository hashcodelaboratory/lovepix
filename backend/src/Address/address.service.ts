import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createAddressDto: CreateAddressDto) {
        if(Array.isArray(createAddressDto)){
            return await this.prismaService.address.createMany({
                data: createAddressDto
            })
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

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        return await this.prismaService.address.update({
            where: {
                id: id
            },
            data: updateAddressDto
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