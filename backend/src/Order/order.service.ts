import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Order, prismaService);
  }

  create = (data: OrderDto) =>
    this.prismaService.order.create({
      data
    });

  createMany = (data: OrderDto[]) =>
    this.prismaService.order.createMany({
      data
    });

  findAll = () =>
    this.prismaService.order.findMany({
      include: {
        orderItems: true
      }
    });

  findOne = (id: string) => this.prismaService.order.findUnique(findById(id));

  update = (id: string, data: Partial<OrderDto>) =>
    this.prismaService.order.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.order.delete(findById(id));

  removeAll = () => this.prismaService.order.deleteMany();
}
