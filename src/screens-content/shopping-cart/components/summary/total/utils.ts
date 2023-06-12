import { messages } from 'messages/messages'
import { Delivery as DeliveryOptions } from '../../../../../common/enums/delivery'
import { Payment as PaymentEnum } from '../../../../../common/enums/payment'

export const getDeliveryMessage = (param?: DeliveryOptions) => {
  switch (param) {
    case DeliveryOptions.COURIER:
      return messages.courier
    default:
      return messages.personalCollect
  }
}

export const getPaymentMessage = (param?: PaymentEnum) => {
  switch (param) {
    case PaymentEnum.ONLINE:
      return messages.online
    case PaymentEnum.PERSONAL_DELIVERY:
      return messages.personalDelivery
    default:
      return messages.transaction
  }
}

export const getPriceForDelivery = (param?: DeliveryOptions) => {
  switch (param) {
    case DeliveryOptions.COURIER:
      return 5
    default:
      return 0
  }
}

export const getPriceForPayment = (param?: PaymentEnum) => {
  switch (param) {
    case PaymentEnum.PERSONAL_DELIVERY:
      return 2
    default:
      return 0
  }
}
