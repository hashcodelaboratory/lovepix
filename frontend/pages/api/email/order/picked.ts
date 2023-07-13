import {
  BAD_REQUEST_ERROR_MESSAGE,
  emailTemplateOrderState,
} from 'api/email/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { transporter } from '../../../../src/api/email/transporter'

const sendOrderShipped = async (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) => {
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

    const mailOptions = {
      from: 'LovePix <noreply@lovepix.sk>',
      to: _body.dest,
      subject: 'Objednávka: #' + _body.id,
      html: emailTemplateOrderState(_body),
    }

    return transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        return res.send(error.toString())
      }
      return res.status(200).json('Email sent successfully')
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default sendOrderShipped
