import styles from '../../../order-detail.module.scss'
import { ImageLayout } from '../../../../../../../../../home/enums/enums'
import Image from 'next/image'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Button } from '@mui/material'
import { generatePdf } from '../../../../../utils/post-processing/generatePdf'
import { Order } from '../../../../../../../../../../common/types/order'
import { Image as ImageType } from '../../../../../../../../../../common/types/image'

type Props = {
  image: ImageType
  index: number
  order: Order
}

const OrderDetailRow = ({ image, index, order }: Props): JSX.Element => {
  const { origin, url, material, width, height, qty, price, pdf } = image

  return (
    <div className={styles.row} key={url}>
      <div
        className={styles.flex}
        style={{ justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <p style={{ marginRight: 8 }}>{qty} ks</p>
        <a
          href={`${url}`}
          download={`${order.id}-${material}-${width}x${height}-${qty}.jpeg`}
        >
          <Image
            alt={url}
            src={url}
            width={40}
            height={40}
            layout={ImageLayout.FIXED}
          />
        </a>
      </div>
      <div>{material}</div>
      <div>
        {width}x{height}
      </div>
      <div>{Number(price).toFixed(2)} €</div>
      {pdf ? (
        <a target='_blank' href={image.pdf} rel='noopener noreferrer'>
          <PictureAsPdfIcon color='error' />
        </a>
      ) : (
        <Button
          variant='contained'
          onClick={() =>
            generatePdf(order?.shoppingCart?.images, index, image, order.id)
          }
        >
          PDF
        </Button>
      )}
      <Button variant='outlined'>
        <a target='_blank' href={origin} rel='noopener noreferrer'>
          Origin
        </a>
      </Button>
    </div>
  )
}

export default OrderDetailRow
