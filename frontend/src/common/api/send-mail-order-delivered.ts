import { loggingService } from '../../analytics/logging-service'
import { LovepixEvent } from '../../analytics/lovepix-event'

export type OrderStateMail = {
  id: string
  dest: string[]
  text: string
}

export const sendMailOrderDelivered = async (
  orderId: string,
  email: string,
  text: string,
  pdf?: string
) => {
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
