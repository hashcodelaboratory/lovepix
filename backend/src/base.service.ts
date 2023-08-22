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
    private readonly modelName: Prisma.ModelName,
    readonly prismaService: PrismaService,
  ) {
    this.model = modelName;
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
    console.log(id, relationIds, relation.toLowerCase() + 'Ids', this.model.toLowerCase());
    const ids = await this.prismaService[this.model.toLowerCase()].findUnique(findById(id))[relation.toLowerCase() + 'Ids'];
    console.log(ids);
    const idsToAdd = relationIds.filter(
      (relationId) => !ids.includes(relationId),
    );
    const idsToRemove = ids.filter(
      (documentId) => !relationIds.includes(documentId),
    );

    const toRemove = await this.prismaService[relation].findMany(
      findAllFromArray(idsToRemove),
    );

    await this.prismaService.$transaction([
      ...idsToAdd.map((relationId) =>
        this.prismaService[relation].update(
          addRelationIdsQuery(relationId, id, this.modelName + 'Ids'),
        ),
      ),
      ...toRemove.map((relationDocument) =>
        this.prismaService[relation].update(
          deleteRelationIdsQuery(
            relationDocument.id,
            relationDocument[this.modelName + 'Ids'],
            id,
            this.modelName + 'Ids',
          ),
        ),
      ),
    ]);
  };
}
