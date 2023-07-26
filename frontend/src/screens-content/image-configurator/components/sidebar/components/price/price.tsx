import styles from '../../../../image-configurator-layout.module.scss'
import { getPrice } from './utils/generator'
import { materials } from '../../../../../home/utils/configuration'
import { Configuration } from '../../../../../../common/types/configuration'
import { splitDimension } from '../../../../../../common/utils/split-dimension'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'

type PriceProps = {
  configuration: Configuration
}

const Price = ({ configuration }: PriceProps) => {
  const { t, i18n } = useTranslation()
  const formatOptions = {style: "currency", maximumSignificantDigits: 3, currencyDisplay: "symbol", currency: "EUR"}

  const { width, height } = splitDimension(configuration?.dimensionId) ?? {
    width: 0,
    height: 0,
  }

  const computedPrice =
    width > 0 && height > 0
      ? getPrice(
          width,
          height,
          materials.find((material) => material.id === configuration?.material)
            ?.name
        )
      : "-"

  const noTaxPrice =
    computedPrice !== '-' ? computedPrice * 0.8 : '-'
  
  const formatPrice = (price: (string | number)) => {
    if(typeof price === "string") return "-- €"
    return new Intl.NumberFormat(i18n.language,formatOptions).format(price)
  }
  return (
    <div className={styles.containerPadding}>
      <div className={styles.price}>
        <h4>
          <b>{t(localizationKey.price)}</b>
        </h4>
        <p className={styles.priceNoTax}>{formatPrice(noTaxPrice)} {t(localizationKey.withoutTaxes)}</p>
        <h4>
          <b>{formatPrice(computedPrice)}</b>
        </h4>
      </div>
      <hr />
    </div>
  )
}

export default Price
