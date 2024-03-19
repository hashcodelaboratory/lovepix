import { loggingService } from '../../../analytics/logging-service'
import { LovepixEvent } from '../../../analytics/lovepix-event'

export type SendMailRequest = {
  orderId: string
  email: string
  text: string
  pdf?: string
}

class EmailService {
  public sendMailDelivered = async (params: SendMailRequest) => {
    const { orderId, email, text, pdf } = params
    const body = {
      id: orderId,
      dest: email,
      text: text,
      pdfInvoice: pdf,
    }

    loggingService.logEvent(LovepixEvent.NOTIFICATION_EMAILS, {
      extra: {
        category: 'SEND_MAIL_ORDER_DELIVERED',
        body,
      },
    })

    return await fetch('/api/email/order/delivered', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  public sendMailShipped = async (params: SendMailRequest) => {
    const { orderId, email, text } = params

    const body = {
      id: orderId,
      dest: email,
      text: text,
    }

    loggingService.logEvent(LovepixEvent.NOTIFICATION_EMAILS, {
      extra: {
        category: 'SEND_MAIL_ORDER_SHIPPED',
        body,
      },
    })

    return await fetch('/api/email/order/shipped', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
}

export const emailService = new EmailService()
