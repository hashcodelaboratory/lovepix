import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { findById } from '../utils/query';
import { BaseService } from '../base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

const getAllPricesQuery = (id: string) => ({
  ...findById(id),
  select: {
    orderItems: {
      include: {
        product: true,
        image: true
      }
    },
    shipment: true,
    payment: true
  }
});

const getOrderInfoQuery = {
  select: {
    id: true,
    orderDate: true,
    orderState: true,
    recipient: {
      select: {
        user: true,
        shippingAddress: true,
        billingAddress: true,
        ico: true,
        dic: true
      }
    },
    orderItems: true,
    shipment: true,
    payment: true
  }
};

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

  findAll = () => this.prismaService.order.findMany(getOrderInfoQuery);

  getOrderedByDate = () => {
    return this.prismaService.order.findMany({
      orderBy: {
        orderDate: 'desc'
      },
      ...getOrderInfoQuery
    });
  };

  findOne = (id: string) =>
    this.prismaService.order.findUnique({
      ...findById(id),
      ...getOrderInfoQuery
    });

  getPrice = async (id: string) => {
    const order = await this.prismaService.order.findUnique(
      getAllPricesQuery(id)
    );
    let images: number[] = [];
    let products: number[] = [];
    order.orderItems.map((item) => {
      if (item.productId) products.push(item.product.price * item.quantity);
      if (item.imageId) images.push(item.image.price * item.quantity);
    });
    return (
      images.reduce((a, b) => a + b, 0) +
      products.reduce((a, b) => a + b, 0) +
      order.shipment.price +
      order.payment.price
    );
  };

  update = (id: string, data: Partial<OrderDto>) =>
    this.prismaService.order.update({
      ...findById(id),
      data
    });

  remove = (id: string) => this.prismaService.order.delete(findById(id));

  removeAll = () => this.prismaService.order.deleteMany();
}
