import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super(Prisma.ModelName.Payment, prismaService);
  }

  create = (data: PaymentDto) =>
    this.prismaService.payment.create({
      data
    });

  createMany = (data: PaymentDto[]) =>
    this.prismaService.payment.createMany({
      data
    });

  findAll = () => this.prismaService.payment.findMany();

  findOne = (id: string) => this.prismaService.payment.findUnique(findById(id));

  update = (id: string, data: Partial<PaymentDto>) =>
    this.prismaService.payment.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.payment.delete(findById(id));

  removeAll = () => this.prismaService.payment.deleteMany();
}
