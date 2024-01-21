import { Writable } from 'stream'
import { Client } from 'basic-ftp'

import formidable from 'formidable'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { writeFileSync } from 'fs'

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 20_000_000,
  maxFieldsSize: 20_000_000,
  maxFields: 14,
  allowEmptyFiles: false,
  multiples: false,
}

const FTP_CONFIGURATION = {
  host: process.env.NEXT_PUBLIC_FTP_HOST!,
  user: process.env.NEXT_PUBLIC_FTP_USER!,
  password: process.env.NEXT_PUBLIC_FTP_PASSWORD!,
  port: parseInt(process.env.NEXT_PUBLIC_FTP_PORT!),
  secure: process.env.NEXT_PUBLIC_FTP_SECURE! === 'true',
  secureOptions: {
    rejectUnauthorized:
      process.env.NEXT_PUBLIC_FTP_REJECT_UNAUTHORIZED! === 'true',
  },
}

const formidablePromise = (
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
  new Promise((accept, reject) => {
    const form = formidable(opts)

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return accept({ fields, files })
    })
  })

const fileConsumer = <T = unknown>(acc: T[]) =>
  new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk)
      next()
    },
  })

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(404).end()

  try {
    const chunks: never[] = []

    const { fields, files } = await formidablePromise(req, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    })

    const fileData = Buffer.concat(chunks) // or is it from? I always mix these up

    const client = new Client()
    client.ftp.verbose = true

    await client.access(FTP_CONFIGURATION)

    await client.ensureDir('/')

    // @ts-ignore
    const testFile = files['original'][0]
    writeFileSync(`/tmp/${testFile.newFilename}`, fileData)

    await client.uploadFrom(
      `/tmp/${testFile.newFilename}`,
      testFile.newFilename
    )

    return res.status(204).end()
  } catch (err) {
    console.log('❌', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

export default upload
