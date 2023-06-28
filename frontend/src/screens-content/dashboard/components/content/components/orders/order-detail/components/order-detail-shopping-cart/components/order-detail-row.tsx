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
  return (
    <div className={styles.row} key={image.url}>
      <div
        className={styles.flex}
        style={{ justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <p style={{ marginRight: 8 }}>{image.qty} ks</p>
        <a target='_blank' href={`${image.url}`} rel='noopener noreferrer'>
          <Image
            alt={image.url}
            src={image.url}
            width={40}
            height={40}
            layout={ImageLayout.FIXED}
          />
        </a>
      </div>
      <div>{image.material}</div>
      <div>
        {image.width}x{image.height}
      </div>
      <div>{image.price.toFixed(2)} €</div>
      {image.pdf ? (
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
    </div>
  )
}

export default OrderDetailRow
