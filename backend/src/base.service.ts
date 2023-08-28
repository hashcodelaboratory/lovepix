import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  addRelationIdsQuery,
  deleteRelationIdsQuery,
  findAllFromArray,
  findById
} from './utils/query';
import { idsReference } from './utils/reference';

@Injectable()
export class BaseService {
  private readonly model!: Prisma.ModelName;

  constructor(
    private readonly modelName: Prisma.ModelName,
    readonly prismaService: PrismaService
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
    relationModelName: Prisma.ModelName
  ) => {
    const ids = (
      await this.prismaService[this.model.toLowerCase()].findUnique(
        findById(id)
      )
    )[idsReference(relationModelName)];
    const idsToAdd = relationIds.filter(
      (relationId) => !ids.includes(relationId)
    );
    const idsToRemove = ids.filter(
      (documentId) => !relationIds.includes(documentId)
    );

    const toRemove = await this.prismaService[
      relationModelName.toLowerCase()
    ].findMany(findAllFromArray(idsToRemove));

    await this.prismaService.$transaction([
      ...idsToAdd.map((relationId) =>
        this.prismaService[relationModelName].update(
          addRelationIdsQuery(relationId, id, idsReference(this.modelName))
        )
      ),
      ...toRemove.map((relationDocument) =>
        this.prismaService[relationModelName.toLowerCase()].update(
          deleteRelationIdsQuery(
            relationDocument.id,
            relationDocument[idsReference(this.modelName)],
            id,
            idsReference(this.modelName)
          )
        )
      )
    ]);
  };
}
