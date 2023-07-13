import { emailTemplateUser } from '../../../src/api/email/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { transporter } from '../../../src/api/email/transporter'
import { BAD_REQUEST_ERROR_MESSAGE } from 'utils'

const send = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
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

    const mailOptionsWithAttachment = {
      from: 'LovePix <noreply@lovepix.sk>',
      to: _body.formData.email,
      subject: 'Objednávka: #' + _body.id,
      attachments: [
        {
          filename: `faktúra_${_body.id}.pdf`,
          path: _body.pdfInvoice,
        },
      ],
      html: emailTemplateUser(_body),
    }

    const mailOptions = {
      from: 'LovePix <noreply@lovepix.sk>',
      to: _body.formData.email,
      subject: 'Objednávka: #' + _body.id,
      html: emailTemplateUser(_body),
    }

    const option = _body.pdfInvoice ? mailOptionsWithAttachment : mailOptions

    // returning result
    return transporter.sendMail(option, (error: any) => {
      if (error) {
        return res.send(error.toString())
      }
      return res.status(200).json('Email successfully sended')
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default send
