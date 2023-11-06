import styles from '../../../../image-configurator-layout.module.scss'
import { getPrice } from './utils/generator'
import { Configuration } from '../../../../../../common/types/configuration'
import { splitDimension } from '../../../../../../common/utils/split-dimension'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'
import { formatPrice } from 'common/utils/priceFormatting'
import {
  DimensionType,
  useDimension,
} from '../../../../../../common/api/use-dimension'
import { useEffect, useMemo, useState } from 'react'
import { useGalleryDetail } from '../../../../../../common/api/use-gallery-detail'
import {
  MaterialType,
  useMaterial,
} from '../../../../../../common/api/use-material'
import { getMaterialId } from '../../../../../../common/utils/get-material-id'

type GalleryDetailType = {
  price: number
}

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

  const [galleryDetail, setGalleryDetail] = useState<GalleryDetailType>()
  const [dimensionDetail, setDimensionDetail] = useState<DimensionType>()
  const [materialDetail, setMaterialDetail] = useState<MaterialType>()

  const { refetch: fetchGalleryDetail } = useGalleryDetail(galleryItemId, {
    enabled: !!galleryItemId,
    onSuccess: (res) => {
      setGalleryDetail(res)
    },
  })

  const galleryDetailPrice = galleryDetail?.price ?? 0

  const { refetch } = useDimension(`DIM-${dimensionId}`, {
    enabled: !!dimensionId,
    onSuccess: (res) => {
      setDimensionDetail(res)
    },
  })

  const { refetch: fetchMaterialDetail } = useMaterial(
    getMaterialId(material),
    {
      enabled: !!material,
      onSuccess: (res) => {
        setMaterialDetail(res)
      },
    }
  )

  const computedPrice = useMemo(() => {
    if (dimensionDetail && material) {
      return dimensionDetail?.price?.[material] + galleryDetailPrice
    } else {
      return '-'
    }
  }, [material, dimensionDetail])

  const noTaxPrice = useMemo(
    () => (computedPrice !== '-' ? (computedPrice as number) * 0.8 : '-'),
    [computedPrice]
  )

  useEffect(() => {
    if (dimensionId) {
      refetch()
    } else {
      setDimensionDetail(undefined)
    }
  }, [dimensionId])

  useEffect(() => {
    if (galleryItemId) {
      fetchGalleryDetail()
    } else {
      setGalleryDetail(undefined)
    }
  }, [galleryItemId])

  useEffect(() => {
    if (material) {
      fetchMaterialDetail()
    } else {
      setMaterialDetail(undefined)
    }
  }, [material])

  return (
    <div className={styles.containerPadding}>
      <div className={styles.price}>
        <div className={styles.deliveryPriceText}>Doručenie:</div>
        <div className={styles.deliveryPriceTextSecondary}>
          {materialDetail?.delivery}
        </div>
      </div>
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
