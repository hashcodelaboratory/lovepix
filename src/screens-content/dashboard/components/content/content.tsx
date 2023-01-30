import Card from './components/home/card'
import styles from '../../dashboard.module.scss'
import { messages } from '../../../../messages/messages'
import StorageTable from './components/home/storage-table'
import { useContext } from 'react'
import DashboardContext from '../../context/dashboard-context'
import OrdersTable from './components/home/orders-table'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import InventoryIcon from '@mui/icons-material/Inventory'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'

type Props = {
  isFetching: boolean
}

const Content = ({ isFetching }: Props) => {
  const {
    state: { uploadedImages, orders },
  } = useContext(DashboardContext)

  return (
    <div className={styles.contentContainer}>
      <div className={styles.cardRow}>
        <Card
          header={{
            title: messages.orders,
            count: isFetching ? '-' : orders.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: '+ 55 %',
            text: messages.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: messages.products,
            count: String(12456),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: messages.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: messages.uploadedImages,
            count: isFetching ? '-' : uploadedImages.length.toString(),
            icon: <FolderCopyIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: messages.thanLastWeek,
          }}
        />
      </div>
      <OrdersTable />
      <StorageTable />
    </div>
  )
}

export default Content
