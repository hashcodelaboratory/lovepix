import { Injectable } from '@nestjs/common';
import { RecipientDto } from './dto/recipient.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

enum findArguments {
  orders = 'orders',
  user = 'user'
}

const findAdresses = (id: string) => ({
  ...findById(id),
  select: {
    billingAddress: true,
    shippingAddress: true
  }
});

@Injectable()
export class RecipientService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Recipient, prismaService);
  }

  create = (data: RecipientDto) =>
    this.prismaService.recipient.create({
      data
    });

  createMany = (data: RecipientDto[]) =>
    this.prismaService.recipient.createMany({
      data
    });

  findAll = () => this.prismaService.recipient.findMany();

  findOne = (id: string) =>
    this.prismaService.recipient.findUnique(findById(id));

  findOrders = (id: string) => this.findRelation(id, findArguments.orders);

  findAddresses = (id: string) =>
    this.prismaService.recipient.findUnique(findAdresses(id));

  findUser = (id: string) => this.findRelation(id, findArguments.user);

  update = (id: string, data: Partial<RecipientDto>) =>
    this.prismaService.recipient.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.recipient.delete(findById(id));

  removeAll = () => this.prismaService.recipient.deleteMany();
}
