import { Prisma } from '@prisma/client';
import { lowerCase } from './query';

export const idsReference = (model: Prisma.ModelName) =>
  lowerCase(model) + 'Ids';
