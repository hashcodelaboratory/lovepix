import { emailTemplateUser } from 'api/emails/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const create = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
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

    const _body = await JSON.parse(req.body)

    if (!_body) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE,
      })

      return
    }

    const transporter = nodemailer.createTransport({
      service: 'websupport',
      host: 'smtp.websupport.sk',
      port: 465,
      auth: {
        user: 'noreply@lovepix.sk',
        pass: 'Ov7<5=@dv)',
      },
    })

    const mailOptions = {
      from: 'LovePix <noreply@lovepix.sk>',
      to: _body.formData.email,
      subject: 'Objednávka: #' + _body.id,
      attachments: [
        {
          filename: 'faktúra_objednávka.pdf',
          path: _body.pdfInvoice,
        },
      ],
      html: emailTemplateUser(_body),
    }

    // returning result
    return transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        return res.send(error.toString())
      }
      return res.status(200).json('Email successfully sended')
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default create
