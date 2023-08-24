import Card from './components/card/card'
import styles from '../../dashboard.module.scss'
import { localizationKey } from '../../../../localization/localization-key'
import { useContext } from 'react'
import DashboardContext from '../../context/dashboard-context'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import InventoryIcon from '@mui/icons-material/Inventory'
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
      categoriesEshop,
      materials,
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
          link={DashboardRoutes.ORDERS}
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
            title: localizationKey.dimensions,
            count: isFetching ? '-' : String(dimensions?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.DIMENSIONS}
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
          link={DashboardRoutes.CATEGORIES}
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
            count: isFetching ? '-' : String(uploadImages?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.GALLERY}
        />
        <Card
          header={{
            title: localizationKey.materials,
            count: isFetching ? '-' : String(materials?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: localizationKey.thanLastWeek,
          }}
          link={DashboardRoutes.MATERIALS}
        />
      </div>
    </div>
  )
}

export default Content
