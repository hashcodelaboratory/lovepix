import {Injectable} from "@nestjs/common";
import {ShipmentDto} from "./dto/shipment.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

@Injectable()
export class ShipmentService extends BaseService {
  create = (data: ShipmentDto) => this.prismaService.shipment.create({
    data
  })

  createMany = (data: ShipmentDto[]) => this.prismaService.shipment.createMany({
    data
  })

  findAll = () => this.prismaService.shipment.findMany();

  findOne = (id: string) => this.prismaService.shipment.findUnique(findById(id));

  update = (id: string, data: Partial<ShipmentDto>) => this.prismaService.shipment.update({
    ...findById(id),
    data
  });

  remove = (id: string) => this.prismaService.shipment.delete(findById(id));

  removeAll = () => this.prismaService.shipment.deleteMany();
}