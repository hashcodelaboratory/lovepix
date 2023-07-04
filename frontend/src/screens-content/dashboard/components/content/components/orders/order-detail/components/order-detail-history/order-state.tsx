import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../../order-detail.module.scss'
import { Order } from 'common/types/order'
import { Collections } from 'common/firebase/enums'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { useQueryClient } from 'react-query'
import { ORDERS_KEY } from 'screens-content/dashboard/api/orders/utils/keys'

type Props = {
  order?: Order
  icon: any
  message: string
  dateState: any
  toggleModal: () => void
  index: number
}

const OrderState = ({
  order,
  icon,
  message,
  dateState,
  toggleModal,
  index,
}: Props): JSX.Element => {
  const queryClient = useQueryClient()
  const allowOpenModal = order && order.orderState.length

  const open = () => {
    allowOpenModal === index && toggleModal()
  }

  const save = async () => {
    // const docData = {
    //   ...order?.orderState,
    // }
    await updateDoc(doc(database, Collections.ORDERS, order?.id ?? ''), docData)
    await queryClient.invalidateQueries(ORDERS_KEY)
  }

  return (
    <div className={styles.detailRow} onClick={open}>
      {icon}
      <div>
        <div className={styles.checkRow}>
          <b>{message}</b>
          {dateState && <CheckCircleIcon className={styles.checkCircleIcon} />}
        </div>
        <div style={{ color: 'gray' }}>
          {dateState ? new Date(dateState.date).toLocaleDateString() : '-'}
        </div>
      </div>
    </div>
  )
}

export default OrderState
