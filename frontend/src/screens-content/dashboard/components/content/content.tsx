import Card from './components/card/card'
import styles from '../../dashboard.module.scss'
import { localizationKey } from '../../../../localization/localization-key'
import { useContext } from 'react'
import DashboardContext from '../../context/dashboard-context'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import InventoryIcon from '@mui/icons-material/Inventory'
import { DashboardRoutes } from '../../../../common/enums/routes'
import { useTranslation } from 'next-i18next'

type Props = {
  isFetching: boolean
}

const Content = ({ isFetching }: Props) => {
  const { t } = useTranslation()
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
            title: t(localizationKey.orders),
            count: isFetching ? '-' : orders?.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: t(localizationKey.thanLastWeek),
          }}
          link={DashboardRoutes.ORDERS}
        />
        <Card
          header={{
            title: t(localizationKey.products),
            count: isFetching ? '-' : orders?.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: '+ 25 %',
            text: t(localizationKey.thanLastWeek),
          }}
          link={DashboardRoutes.PRODUCTS}
        />
        <Card
          header={{
            title: t(localizationKey.dimensions),
            count: isFetching ? '-' : String(dimensions?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 15 %',
            text: t(localizationKey.thanLastWeek),
          }}
          link={DashboardRoutes.DIMENSIONS}
        />
        <Card
          header={{
            title: t(localizationKey.categories),
            count: isFetching ? '-' : String(categories?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: t(localizationKey.thanLastWeek),
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
            text: t(localizationKey.thanLastWeek),
          }}
          link={DashboardRoutes.CATEGORIES_ESHOP}
        />
        <Card
          header={{
            title: t(localizationKey.code),
            count: isFetching ? '-' : String(vouchers?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: t(localizationKey.thanLastWeek),
          }}
          link={DashboardRoutes.VOUCHERS}
        />
        <Card
          header={{
            title: t(localizationKey.gallery),
            count: isFetching ? '-' : String(uploadImages?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: '+ 35 %',
            text: t(localizationKey.thanLastWeek),
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
