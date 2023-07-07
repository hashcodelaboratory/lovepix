import styles from '../../../../image-configurator-layout.module.scss'
import { getPrice } from './utils/generator'
import { materials } from '../../../../../home/utils/configuration'
import { DIMENSIONS } from '../../../../../../common/configuration/dimensions/dimensions'
import { Configuration } from '../../../../../../common/types/configuration'
import { splitDimension } from '../../../../../../common/utils/split-dimension'

type PriceProps = {
  configuration: Configuration
}

const Price = ({ configuration }: PriceProps) => {
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
      : '-'

  const noTaxPrice =
    computedPrice !== '-' ? Number(computedPrice * 0.8).toFixed(2) : '--'
  const price = computedPrice !== '-' ? Number(computedPrice).toFixed(2) : '--'

  return (
    <div className={styles.containerPadding}>
      <div className={styles.price}>
        <h4>
          <b>Cena</b>
        </h4>
        <p className={styles.priceNoTax}>{noTaxPrice} € bez DPH</p>
        <h4>
          <b>{price} € </b>
        </h4>
      </div>
      <hr />
    </div>
  )
}

export default Price
