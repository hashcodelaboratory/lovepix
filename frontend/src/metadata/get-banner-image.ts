const bannerAssets = [
  // TODO: rethink image hosting
  'https://firebasestorage.googleapis.com/v0/b/lovepix-production.appspot.com/o/metadata%2Fbanner_0.jpg?alt=media&token=794d6644-88f7-48fd-91eb-4b80694e0c88',
  'https://firebasestorage.googleapis.com/v0/b/lovepix-production.appspot.com/o/metadata%2Fbanner_1.jpg?alt=media&token=4a06e497-c38a-498f-a4a0-a455dff3a524',
  'https://firebasestorage.googleapis.com/v0/b/lovepix-production.appspot.com/o/metadata%2Fbanner_2.jpg?alt=media&token=806ecf13-9936-49ef-9927-8c9ee80199e6',
  'https://firebasestorage.googleapis.com/v0/b/lovepix-production.appspot.com/o/metadata%2Fbanner_3.jpg?alt=media&token=7df98573-f2fe-4523-8417-573b1440632f',
]

export const getBannerImage = (): string =>
  bannerAssets[Math.floor(Math.random() * bannerAssets.length)]
