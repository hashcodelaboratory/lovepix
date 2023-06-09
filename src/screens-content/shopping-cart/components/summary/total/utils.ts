import { FormInputs } from 'common/types/form'
import { messages } from 'messages/messages'
import { Delivery as DeliveryOptions } from '../../../../../common/enums/delivery'
import { Payment as PaymentEnum } from '../../../../../common/enums/payment'

export const getDelivery = (formData: FormInputs) => {
  switch (formData.delivery) {
    case DeliveryOptions.COURIER:
      return messages.courier
    case DeliveryOptions.PERSONAL_COLLECT:
      return messages.personalCollect
  }
}

export const getPayment = (formData: FormInputs) => {
  switch (formData.payment) {
    case PaymentEnum.ONLINE:
      return messages.online
    case PaymentEnum.PERSONAL_DELIVERY:
      return messages.personalDelivery
    case PaymentEnum.TRANSACTION:
      return messages.transaction
  }
}

export const getDeliveryPrice = (formData: FormInputs): number | undefined => {
  switch (formData.delivery) {
    case DeliveryOptions.COURIER:
      return 5
    case DeliveryOptions.PERSONAL_COLLECT:
      return 0
  }
}

export const getPaymentPrice = (formData: FormInputs): number | undefined => {
  switch (formData.payment) {
    case PaymentEnum.ONLINE:
      return 0
    case PaymentEnum.PERSONAL_DELIVERY:
      return 2
    case PaymentEnum.TRANSACTION:
      return 0
  }
}
