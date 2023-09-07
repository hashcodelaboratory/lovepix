const bannerAssets = [
  '/banner_0.jpg',
  '/banner_1.jpg',
  '/banner_2.jpg',
  '/banner_3.jpg',
]

export const getBannerImage = (): string =>
  bannerAssets[Math.floor(Math.random() * bannerAssets.length)]
