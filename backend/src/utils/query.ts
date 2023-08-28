import { PrismaService } from 'src/prisma/prisma.service';

export const findById = (id: string) => ({
  where: {
    id
  }
});

export const findAllFromArray = (ids: string[]) => ({
  where: {
    id: {
      in: ids
    }
  }
});

export const addRelationIdsQuery = (
  id: string,
  addId: string,
  relationModelName: string
) => ({
  ...findById(id),
  data: {
    [relationModelName]: {
      push: addId
    }
  }
});

export const deleteRelationIdsQuery = (
  id: string,
  ids: string[],
  deleteId: string,
  relationModelName: string
) => ({
  ...findById(id),
  data: {
    [relationModelName]: {
      set: ids.filter((Ids) => Ids !== deleteId)
    }
  }
});
