import styles from '../../../dashboard.module.scss'
import { SIDEBAR_MENU_LIST } from '../utils/menu'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useOrders } from '../../../api/orders/use-orders'
import { localizationKey } from '../../../../../localization/localization-key'
import { useProducts } from '../../../../../common/api/use-products'
import { useGallery } from '../../../../../common/api/use-gallery'
import { useDimensions } from '../../../../../common/api/use-dimensions'
import { useCategories } from '../../../../../common/api/use-categories'
import { useCategoriesEshop } from '../../../../../common/api/use-categories-eshop'
import { useMaterials } from '../../../../../common/api/use-materials'
import { useVouchers } from '../../../../../common/api/use-vouchers'

const SidebarContent = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: orders } = useOrders()
  const { data: products } = useProducts()
  const { data: gallery } = useGallery()
  const { data: dimensions } = useDimensions()
  const { data: categories } = useCategories()
  const { data: categoriesEshop } = useCategoriesEshop()
  const { data: materials } = useMaterials()
  const { data: vouchers } = useVouchers()

  const goTo = (link: string) => router.push(link)

  const countMapper = {
    [localizationKey.orders]: {
      count: orders?.length,
    },
    [localizationKey.products]: {
      count: products?.length,
    },
    [localizationKey.gallery]: {
      count: gallery?.length,
    },
    [localizationKey.dimensions]: {
      count: dimensions?.length,
    },
    [localizationKey.categories]: {
      count: categories?.length,
    },
    ['Kategórie e-shop']: {
      count: categoriesEshop?.length,
    },
    [localizationKey.materials]: {
      count: materials?.length,
    },
    [localizationKey.code]: {
      count: vouchers?.length,
    },
  }

  const list = SIDEBAR_MENU_LIST.map(({ title, link }) => (
    <div
      className={styles.sidebarRow}
      key={uuidv4()}
      onClick={() => goTo(link)}
    >
      <p className={styles.sidebarRowTitle}>{String(t(title))}</p>
      {countMapper[title]?.count && (
        <p
          className={styles.sidebarRowSubtitle}
        >{`(${countMapper[title]?.count})`}</p>
      )}
    </div>
  ))

  return <div className={styles.sidebarContent}>{list}</div>
}

export default SidebarContent
