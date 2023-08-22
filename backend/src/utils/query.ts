import { PrismaService } from "src/prisma/prisma.service";

export const findById = (id: string) => ({
    where: {
      id
    }
  })

export const findAllFromArray = (ids: string[]) => ({
  where: {
    id: {
      in: ids
    }
  }
})

export const addRelationIdsQuery = (id: string, addId: string, relation: string) => ({
  ...findById(id),
  data: {
    [relation]: {
      push: addId
    }
  }
})

export const deleteRelationIdsQuery = (id: string, ids: string[], deleteId: string, relation: string) => ({
  ...findById(id),
  data: {
    [relation]: {
      set: ids.filter((Ids) => Ids !== deleteId)
    }
  }
})