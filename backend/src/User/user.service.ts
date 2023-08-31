import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';

const findOrders = (id: string) => ({
  ...findById(id),
  select: {
    orders: {
      select: {
        orders: {
          select: {
            id: true,
            orderDate: true,
            orderState: true,
            orderItems: true,
            shipment: true,
            payment: true
          }
        }
      }
    }
  }
});
@Injectable()
export class UserService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('User', prismaService);
  }

  create = (data: UserDto) =>
    this.prismaService.user.create({
      data
    });

  createMany = (data: UserDto[]) =>
    this.prismaService.user.createMany({
      data
    });

  findAll = () => this.prismaService.user.findMany();

  findOne = (id: string) => this.prismaService.user.findUnique(findById(id));

  findOrders = (id: string) =>
    this.prismaService.user.findUnique(findOrders(id));

  update = (id: string, data: Partial<UserDto>) =>
    this.prismaService.user.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.user.delete(findById(id));

  removeAll = () => this.prismaService.user.deleteMany();
}
