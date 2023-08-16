import {Injectable} from "@nestjs/common";
import {RecipientDto} from "./dto/recipient.dto";
import {findById} from "../utils/query";
import {BaseService} from "../base.service";

@Injectable()
export class RecipientService extends BaseService {
  create = (data: RecipientDto) => this.prismaService.recipient.create({
    data
  })

  createMany = (data: RecipientDto[]) => this.prismaService.recipient.createMany({
    data
  })

  findAll = () => this.prismaService.recipient.findMany({
    include: {
      orders: true
    }
  });

  findOne = (id: string) => this.prismaService.recipient.findUnique(findById(id));

  update = (id: string, data: Partial<RecipientDto>) => this.prismaService.recipient.update({
    ...findById(id),
    data
  });

  remove = (id: string) => this.prismaService.recipient.delete(findById(id));

  removeAll = () => this.prismaService.recipient.deleteMany();
}