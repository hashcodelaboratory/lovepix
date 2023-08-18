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