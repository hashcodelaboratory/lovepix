export const splitDimension = (dim: string) => {
  return {
    width: Number(dim.substring(0, dim.indexOf('x'))),
    height: Number(dim.substring(dim.indexOf('x') + 1)),
  }
}
