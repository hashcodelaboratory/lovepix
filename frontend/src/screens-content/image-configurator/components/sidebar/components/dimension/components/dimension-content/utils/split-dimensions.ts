export const splitDimensions = (dimensions: string[]) => {
  const borders = dimensions.map((dim) => ({
    left: Number(dim.substring(0, dim.indexOf('x'))),
    right: Number(dim.substring(dim.indexOf('x') + 1)),
    dim: dim,
  }))

  const width: string[] = []
  const height: string[] = []
  const square: string[] = []

  borders.forEach(({ left, right, dim }) => {
    if (left < right) {
      height.push(dim)
    } else if (left > right) {
      width.push(dim)
    } else {
      square.push(dim)
    }
  })

  return {
    byWidth: width,
    byHeight: height,
    bySquare: square,
  }
}
