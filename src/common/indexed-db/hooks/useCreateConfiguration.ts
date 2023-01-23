import { MutationOptions, useMutation, UseMutationResult } from "react-query";
import { Material } from "../../enums/material";
import { configurationsTable } from "../../../../database.config";

export type Request = {
  origin?: string;
  image?: string;
  dimensionId?: string;
  material?: Material;
};

const createConfiguration = async (data: Request) => {
  // configurationsTable.add(data, 'conf');
};

export const useCreateConfiguration = (
  options?: MutationOptions<any, any, Request>
): UseMutationResult<any, any, Request> =>
  useMutation(createConfiguration, options);
