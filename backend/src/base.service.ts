import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  addRelationIdsQuery,
  deleteRelationIdsQuery,
  findAllFromArray,
  findById,
  lowerCase
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

  manyToManyRelationConnect = (data: any, relationName: string, arrayName) => {
    return this.prismaService[lowerCase(this.modelName)].update({
      ...findById(data.id),
      data: {
        [relationName]: {
          connect: data[arrayName].map((item) => ({ id: item }))
        }
      }
    });
  };

  updateRelationIds = async (
    id: string,
    relationIds,
    relationModelName: Prisma.ModelName
  ) => {
    const ids = (
      await this.prismaService[lowerCase(this.modelName)].findUnique(
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
      lowerCase(relationModelName)
    ].findMany(findAllFromArray(idsToRemove));

    await this.prismaService.$transaction([
      ...idsToAdd.map((relationId) =>
        this.prismaService[relationModelName].update(
          addRelationIdsQuery(relationId, id, idsReference(this.modelName))
        )
      ),
      ...toRemove.map((relationDocument) =>
        this.prismaService[lowerCase(relationModelName)].update(
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
