import Card from './components/card/card'
import styles from '../../dashboard.module.scss'
import { localizationKey } from '../../../../localization/localization-key'
import UploadImagesTable from './components/gallery/upload-images-table'
import { useContext } from 'react'
import DashboardContext from '../../context/dashboard-context'
import OrdersTable from './components/orders/orders-table'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import InventoryIcon from '@mui/icons-material/Inventory'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import Dimensions from './components/dimensions/dimensions'
import Categories from './components/categories/categories'
import { DashboardRoutes } from '../../../../common/enums/routes'

type Props = {
  isFetching: boolean
}

const Content = ({ isFetching }: Props) => {
  const {
    state: {
      uploadImages,
      orders,
      dimensions,
      categories,
      vouchers,
      galleryImages,
      categoriesEshop,
    },
  } = useContext(DashboardContext)

  return (
    <div className={styles.contentContainer}>
      <div className={styles.cardRow}>
        <Card
          header={{
            title: localizationKey.orders,
            count: isFetching ? '-' : orders?.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: localizationKey.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: localizationKey.products,
            count: isFetching ? '-' : orders?.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: '+ 25 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.PRODUCTS}
        />
        <Card
          header={{
            title: localizationKey.storage,
            count: isFetching ? '-' : uploadImages?.length.toString(),
            icon: <FolderCopyIcon />,
          }}
          footer={{
            value: '+ 45 %',
            text: localizationKey.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: localizationKey.dimensions,
            count: isFetching ? '-' : String(dimensions?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: localizationKey.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: localizationKey.categories,
            count: isFetching ? '-' : String(categories?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: 'Kategórie e-shop',
            count: isFetching ? '-' : String(categoriesEshop?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.CATEGORIES_ESHOP}
        />
        <Card
          header={{
            title: localizationKey.code,
            count: isFetching ? '-' : String(vouchers?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.VOUCHERS}
        />
        <Card
          header={{
            title: localizationKey.gallery,
            count: isFetching ? '-' : String(galleryImages?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
        />
      </div>
      <OrdersTable />
      <UploadImagesTable />
      <Dimensions />
      <Categories />
    </div>
  )
}

export default Content
