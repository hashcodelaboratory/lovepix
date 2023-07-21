import { localizationKey } from '../../../../../localization/localization-key'
import { Delivery as DeliveryOptions } from '../../../../../common/enums/delivery'
import { Payment as PaymentEnum } from '../../../../../common/enums/payment'

export const getDeliveryMessage = (param?: DeliveryOptions) => {
  switch (param) {
    case DeliveryOptions.COURIER:
      return localizationKey.courier
    default:
      return localizationKey.personalCollect
  }
}

export const getPaymentMessage = (param?: PaymentEnum) => {
  switch (param) {
    case PaymentEnum.ONLINE:
      return localizationKey.online
    case PaymentEnum.PERSONAL_DELIVERY:
      return localizationKey.personalDelivery
    default:
      return localizationKey.transaction
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
