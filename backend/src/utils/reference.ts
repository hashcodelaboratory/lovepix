import { Prisma } from '@prisma/client';

export const idsReference = (model: Prisma.ModelName) =>
  model.toLowerCase() + 'Ids';
