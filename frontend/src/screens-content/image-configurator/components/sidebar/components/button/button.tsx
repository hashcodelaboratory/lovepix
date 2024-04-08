import styles from '../../../../image-configurator-layout.module.scss'
import { ShoppingCart } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../../localization/localization-key'
import { useRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  configurationsTable,
  orderTable,
} from '../../../../../../../database.config'
import { ORDER_TABLE_KEY } from '../../../../../../common/indexed-db/hooks/keys'
import { Image } from '../../../../../../common/types/image'
import { useContext, useEffect, useMemo, useState } from 'react'
import ImageConfiguratorContext from '../../../../image-configurator-context/image-configurator-context'
import { splitDimension } from '../../../../../../common/utils/split-dimension'
import { StorageFileType } from '../../../../../../common/firebase/storage/enums'
import { MaterialType } from '../../../../../../common/api/use-materials'
import { Configuration } from '../../../../../../common/types/configuration'
import {
  DimensionType,
  useDimension,
} from '../../../../../../common/api/use-dimension'
import { GalleryDetailType } from '../price/price'
import { useGalleryDetail } from '../../../../../../common/api/use-gallery-detail'
import { loggingService } from '../../../../../../analytics/logging-service'
import { LovepixEvent } from '../../../../../../analytics/lovepix-event'

type ButtonProps = {
  configuration: Configuration
  materials: MaterialType[]
}

const Button = ({ materials, configuration }: ButtonProps) => {
  const { t } = useTranslation()

  const router = useRouter()

  const { material, dimensionId, galleryItemId, origin } =
    configuration ?? ({} as Configuration)

  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])

  const { state } = useContext(ImageConfiguratorContext)

  const [galleryDetail, setGalleryDetail] = useState<GalleryDetailType>()
  const [dimensionDetail, setDimensionDetail] = useState<DimensionType>()

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

  const computedPrice = useMemo(() => {
    if (dimensionDetail && material) {
      return Number(dimensionDetail?.price?.[material] + galleryDetailPrice)
    } else {
      return 0
    }
  }, [dimensionDetail, material, galleryDetailPrice])

  const materialType = useMemo(
    () => materials.find((_material) => _material.type === material)?.type,
    [configuration, materials]
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

  const handleUpdateOrder = async () => {
    const dim = splitDimension(dimensionId) ?? {
      width: 0,
      height: 0,
    }

    let totalPrice: number = 0
    order?.shoppingCart?.images?.forEach((image: Image) => {
      totalPrice += image.price * image.qty
    })
    totalPrice += Number(computedPrice)

    const url = state.cropper?.current?.cropper
      .getCroppedCanvas()
      ?.toDataURL(StorageFileType.JPEG)

    const image = {
      url,
      qty: 1,
      origin: origin,
      width: dim.width,
      height: dim.height,
      material: materialType,
      price: Number(Number(computedPrice).toFixed(2)),
    }

    const payload = {
      shoppingCart: {
        images: [...(order?.shoppingCart?.images ?? []), image],
        products: order?.shoppingCart?.products ?? [],
      },
      totalPrice: totalPrice.toFixed(2),
    }

    order?.shoppingCart
      ? orderTable.update(ORDER_TABLE_KEY, payload)
      : orderTable.add(payload, ORDER_TABLE_KEY)

    configurationsTable.clear()

    loggingService.logEvent(LovepixEvent.ADD_TO_CART_CONFIGURATOR, {
      extra: image,
    })

    await router.push(`${t(Pages.SHOPPING_CART)}`)
  }

  const disabled = !state.cropper || !dimensionId || !material

  return (
    <div className={styles.containerPadding}>
      <button
        className={styles.button}
        onClick={handleUpdateOrder}
        disabled={disabled}
      >
        <ShoppingCart />
        <p className={styles.buttonTitle}>
          {String(t(localizationKey.toCart))}
        </p>
      </button>
    </div>
  )
}

export default Button
