import { NextApiRequest, NextApiResponse } from 'next'
import { processImage } from '@hashcodelaboratory/imagination'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

export type Image = {
  url: string
  bucketName: string
  objectKey: string
}

export type Output = {
  objectKey: string
  originImageUrl: string | null
  webp1kbHighEndImageUrl: string | null
  webpHighEndImageUrl: string | null
}

const optimize = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    if (!req.body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const body = await JSON.parse(req.body)

    if (!body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const item = body as Image

    const output: Output = await processImage(item)

    return res.status(200).json(output)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default optimize
