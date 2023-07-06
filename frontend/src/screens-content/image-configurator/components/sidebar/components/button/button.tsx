import styles from '../../../../image-configurator-layout.module.scss'
import { ShoppingCart } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../../../messages/messages'
import { useRouter } from 'next/router'
import { SHOPPING_CART } from 'constants/pages/urls'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  configurationsTable,
  orderTable,
} from '../../../../../../../database.config'
import { DIMENSIONS } from '../../../../../../common/configuration/dimensions/dimensions'
import { getPrice } from '../price/utils/generator'
import { materials } from '../../../../../home/utils/configuration'
import {
  CONFIGURATION_TABLE_KEY,
  ORDER_TABLE_KEY,
} from '../../../../../../common/indexed-db/hooks/keys'
import { Image } from '../../../../../../common/types/image'
import { useContext } from 'react'
import ImageConfiguratorContext from '../../../../image-configurator-context/image-configurator-context'

const Button = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])

  const { state } = useContext(ImageConfiguratorContext)

  const handleUpdateOrder = async () => {
    const dim = DIMENSIONS.find(
      (dim) => dim.id === configuration?.dimensionId
    ) ?? { width: 0, height: 0 }

    const material = materials.find(
      (material) => material.id === configuration?.material
    )?.name

    const price =
      dim.width > 0 && dim.height > 0
        ? getPrice(dim.width, dim.height, material)
        : 0

    let totalPrice: number = 0
    order?.shoppingCart?.images?.forEach((image: Image) => {
      totalPrice += image.price * image.qty
    })
    totalPrice += Number(price)

    const payload = {
      shoppingCart: {
        images: [
          ...(order?.shoppingCart?.images ?? []),
          {
            url: state.cropper?.current?.cropper
              .getCroppedCanvas()
              ?.toDataURL(),
            qty: 1,
            origin: configuration?.origin,
            width: dim.width,
            height: dim.height,
            material,
            price: Number(Number(price).toFixed(2)),
          },
        ],
        products: order?.shoppingCart?.products ?? [],
      },
      totalPrice: totalPrice.toFixed(2),
    }

    order?.shoppingCart
      ? orderTable.update(ORDER_TABLE_KEY, payload)
      : orderTable.add(payload, ORDER_TABLE_KEY)

    configurationsTable.clear()

    await router.push(`${SHOPPING_CART}`)
  }

  const disabled =
    !state.cropper || !configuration?.dimensionId || !configuration?.material

  return (
    <div className={styles.containerPadding}>
      <button
        className={styles.button}
        onClick={handleUpdateOrder}
        disabled={disabled}
      >
        <ShoppingCart />
        <p className={styles.buttonTitle}>{String(t(messages.toCart))}</p>
      </button>
    </div>
  )
}

export default Button