export const findById = (id: string) => ({
  where: {
    id
  }
});

export const findByName = (name: string) => ({
  where: {
    name
  }
});

export const findByTitle = (title: string) => ({
  where: {
    title
  }
});

export const lowerCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};


export const findAllFromArray = (ids: string[]) => ({
  where: {
    id: {
      in: ids
    }
  }
});

export const findAllWithId = (id: string, modelName: string) => ({
  where: {
    [modelName]: {
      some: {
        id
      }
    }
  }
});

export const relationConnect = (
  data: any,
  relationModelName: string,
  arrayName: string
) => ({
  ...findById(data.id),
  data: {
    [relationModelName]: {
      connect: data[arrayName].map((item) => ({ id: item }))
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
