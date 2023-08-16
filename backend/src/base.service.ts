import {Injectable} from "@nestjs/common";
import {PrismaService} from "./prisma/prisma.service";

// TODO: define REST base service
interface IBaseService {
  create: (data: any) => Promise<any>
}

@Injectable()
export class BaseService implements IBaseService {
  constructor(readonly prismaService: PrismaService) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_: any): Promise<any> {
    throw new Error('Create has not been implemented!')
  }
}