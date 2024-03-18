import { loggingService } from '../../analytics/logging-service'
import { LovepixEvent } from '../../analytics/lovepix-event'

export type AdminEmail = {
  id: string
  dest: string[]
}

export const sendOrderMailtoAdmin = async (orderId: string) => {
  const body = {
    id: orderId,
    dest: ['davidbednarik07@gmail.com', 'info@lovepix.sk'],
  }

  loggingService.logEvent(LovepixEvent.NOTIFICATION_EMAILS, {
    extra: {
      category: 'SEND_ORDER_MAIL_TO_ADMIN',
      body,
    },
  })

  return await fetch('/api/email/send-to-admin', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
