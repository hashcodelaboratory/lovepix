import styles from '../../../../image-configurator-layout.module.scss'
import { Configuration } from '../../../../../../common/types/configuration'
import { splitDimension } from '../../../../../../common/utils/split-dimension'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'
import { formatPrice } from 'common/utils/priceFormatting'
import { MaterialType } from '../../../../../../common/api/use-materials'
import { useDimension } from '../../../../../../common/api/use-dimension'
import { useEffect } from 'react'

type PriceProps = {
  configuration: Configuration
  materials: MaterialType[]
}

const Price = ({ materials, configuration }: PriceProps) => {
  const { t, i18n } = useTranslation()

  const { width, height } = splitDimension(configuration?.dimensionId) ?? {
    width: 0,
    height: 0,
  }

  const { data: dimensionDetail, refetch } = useDimension(
    `DIM-${width}x${height}`
  )

  const computedMaterial = materials.find(
    (material) => material.type === configuration?.material
  )?.type

  const computedPrice =
    dimensionDetail && computedMaterial
      ? dimensionDetail?.price?.[computedMaterial]
      : '-'

  useEffect(() => {
    refetch()
  }, [width, height])

  const noTaxPrice = computedPrice !== '-' ? computedPrice * 0.8 : '-'

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
