import Compressor from 'compressorjs'

export const getNormalizedFile = (file: Blob): Promise<Blob> =>
  new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: 1000,
      maxHeight: 1000,
      success(normalizedFile) {
        resolve(normalizedFile)
      },
      error(error) {
        reject(error)
      },
    })
  })
