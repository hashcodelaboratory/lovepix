import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ShipmentDto } from "./dto/shipment.dto";

@Injectable()
export class ShipmentService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createData: ShipmentDto) {
        return this.prismaService.shipment.create({
            data: createData
        })
    }

    async createMany(createData: ShipmentDto[]) {
        return this.prismaService.shipment.createMany({
            data: createData
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

    async update(id: string, updateData: Partial<ShipmentDto>) {
        return await this.prismaService.shipment.update({
            where: {
                id: id
            },
            data: updateData
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