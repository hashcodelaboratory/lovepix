import { Injectable } from '@nestjs/common';
import { OrderStateDto } from './dto/orderState.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderStateService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.OrderState, prismaService);
  }

  create = (data: OrderStateDto) =>
    this.prismaService.orderState.create({
      data
    });

  createMany = (data: OrderStateDto[]) =>
    this.prismaService.orderState.createMany({
      data
    });

  findAll = () => this.prismaService.orderState.findMany();

  findOne = (id: string) =>
    this.prismaService.orderState.findUnique(findById(id));

  update = (id: string, data: Partial<OrderStateDto>) =>
    this.prismaService.orderState.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.orderState.delete(findById(id));

  removeAll = () => this.prismaService.orderState.deleteMany();
}
