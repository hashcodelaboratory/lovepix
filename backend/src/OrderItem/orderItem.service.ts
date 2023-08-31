import { Injectable } from '@nestjs/common';
import { OrderItemDto } from './dto/orderItem.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

const getOrderItemInfoQuery = {
  select: {
    id: true,
    orderId: true,
    product: true,
    image: true,
    quantity: true,
    material: true,
    dimension: true
  }
};

@Injectable()
export class OrderItemService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.OrderItem, prismaService);
  }

  create = (data: OrderItemDto) =>
    this.prismaService.orderItem.create({
      data
    });

  createMany = (data: OrderItemDto[]) =>
    this.prismaService.orderItem.createMany({
      data
    });

  findAll = () => this.prismaService.orderItem.findMany(getOrderItemInfoQuery);

  findOne = (id: string) =>
    this.prismaService.orderItem.findUnique({
      ...findById(id),
      ...getOrderItemInfoQuery
    });

  update = (id: string, data: Partial<OrderItemDto>) =>
    this.prismaService.orderItem.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.orderItem.delete(findById(id));

  removeAll = () => this.prismaService.orderItem.deleteMany();
}
