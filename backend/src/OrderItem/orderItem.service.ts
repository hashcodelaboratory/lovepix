import {Injectable} from "@nestjs/common";
import {OrderItemDto} from "./dto/orderItem.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('OrderItem', prismaService);
  }

  create = (data: OrderItemDto) => this.prismaService.orderItem.create({
    data
  })

  createMany = (data: OrderItemDto[]) => this.prismaService.orderItem.createMany({
    data
  })

  findAll = () => this.prismaService.orderItem.findMany();

  findOne = (id: string) => this.prismaService.orderItem.findUnique(findById(id));

  update = (id: string, data: Partial<OrderItemDto>) => this.prismaService.orderItem.update({
    ...findById(id),
    data
  });

  remove = (id: string) => this.prismaService.orderItem.delete(findById(id));

  removeAll = () => this.prismaService.orderItem.deleteMany();
}