const imageSource = (sourceUrl: string) => `${sourceUrl}?w=248&fit=crop&auto=format`

const imageSourceSet = (sourceUrl: string) => `${sourceUrl}?w=248&fit=crop&auto=format&dpr=2 2x`

export { imageSource, imageSourceSet }