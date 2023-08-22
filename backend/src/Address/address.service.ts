import {Injectable} from "@nestjs/common";
import {AddressDto} from "./dto/address.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService extends BaseService {
  constructor(readonly prismaService: PrismaService) {
    super('Address', prismaService);
  }

  create = (data: AddressDto) => this.prismaService.address.create({
    data
  });

  createMany = (data: AddressDto[]) => this.prismaService.address.createMany({
    data
  })

  findAll = () => this.prismaService.address.findMany();

  findOne = (id: string) => this.prismaService.address.findUnique(findById(id));

  update = (id: string, data: Partial<AddressDto>) => this.prismaService.address.update({
    ...findById(id),
    data
  });

  remove = (id: string) => this.prismaService.address.delete(findById(id));

  removeAll = () => this.prismaService.address.deleteMany();
}