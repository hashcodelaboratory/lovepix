import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  addRelationIdsQuery,
  deleteRelationIdsQuery,
  findAllFromArray,
  findById,
} from './utils/query';

@Injectable()
export class BaseService {
  private readonly model!: Prisma.ModelName;

  constructor(
    private readonly modelMame: Prisma.ModelName,
    readonly prismaService: PrismaService,
  ) {
    this.model = modelMame;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_: any): Promise<any> {
    throw new Error('Create has not been implemented!');
  }

  updateRelationIds = async (
    id: string,
    relationIds,
    relation: Prisma.ModelName,
  ) => {
    const ids = this.prismaService[this.model].findUnique(findById(id))[
      relation + 'Ids'
    ];
    const idsToAdd = relationIds.filter(
      (relationId) => !ids.includes(relationId),
    );
    const idsToRemove = ids.filter(
      (documentId) => !relationIds.includes(documentId),
    );

    const toRemove = await this.prismaService.category.findMany(
      findAllFromArray(idsToRemove),
    );

    await this.prismaService.$transaction([
      ...idsToAdd.map((relationId) =>
        this.prismaService[relation].update(
          addRelationIdsQuery(relationId, id),
        ),
      ),
      ...toRemove.map((relationDocument) =>
        this.prismaService[relation].update(
          deleteRelationIdsQuery(
            relationDocument.id,
            relationDocument.productIds,
            id,
          ),
        ),
      ),
    ]);
  };
}
