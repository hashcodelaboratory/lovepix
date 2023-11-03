import styles from '../../../../image-configurator-layout.module.scss'
import { Configuration } from '../../../../../../common/types/configuration'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'
import { formatPrice } from 'common/utils/priceFormatting'
import { useDimension } from '../../../../../../common/api/use-dimension'
import { useEffect, useMemo } from 'react'

type PriceProps = {
  configuration: Configuration
}

const Price = ({ configuration }: PriceProps) => {
  const { t, i18n } = useTranslation()

  const { material, dimensionId } = configuration ?? ({} as Configuration)

  const { data: dimensionDetail, refetch } = useDimension(
    `DIM-${dimensionId}`,
    {
      enabled: !!dimensionId,
    }
  )

  const computedPrice = useMemo(() => {
    if (dimensionDetail && material) {
      return dimensionDetail?.price?.[material]
    } else {
      return '-'
    }
  }, [material, dimensionDetail])

  const noTaxPrice = useMemo(
    () => (computedPrice !== '-' ? (computedPrice as number) * 0.8 : '-'),
    [computedPrice]
  )

  useEffect(() => {
    dimensionId && refetch()
  }, [dimensionId])

  return (
    <div className={styles.containerPadding}>
      <div className={styles.price}>
        <h4>
          <b>{t(localizationKey.price)}</b>
        </h4>
        <p className={styles.priceNoTax}>
          {formatPrice(noTaxPrice, i18n.language)}{' '}
          {t(localizationKey.withoutTaxes)}
        </p>
        <h4>
          <b>{formatPrice(computedPrice, i18n.language)}</b>
        </h4>
      </div>
      <hr />
    </div>
  )
}

export default Price
