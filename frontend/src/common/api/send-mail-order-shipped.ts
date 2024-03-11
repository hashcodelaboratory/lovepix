import { loggingService } from '../../analytics/logging-service'
import { LovepixEvent } from '../../analytics/lovepix-event'

export type OrderStateMail = {
  id: string
  dest: string[]
  text: string
}

export const sendMailOrderShipped = async (
  orderId: string,
  email: string,
  text: string
) => {
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
