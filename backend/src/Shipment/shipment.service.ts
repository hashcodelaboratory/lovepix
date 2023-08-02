import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UpdateShipmentDto } from "./dto/update-shipment.dto";

@Injectable()
export class ShipmentService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createShipmentDto: CreateShipmentDto) {
        return await this.prismaService.shipment.create({
            data: createShipmentDto
        })
    }

    findAll() {
        return this.prismaService.shipment.findMany();
    }

    async findOne(id: string) {
        return await this.prismaService.shipment.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: string, updateShipmentDto: UpdateShipmentDto) {
        return await this.prismaService.shipment.update({
            where: {
                id: id
            },
            data: updateShipmentDto
        });
    }

    async remove(id: string) {
        return await this.prismaService.shipment.delete({
            where: {
                id: id
            }
        });
    }
}