import styles from './dashboard.module.scss'
import Sidebar from './components/sidebar/sidebar'
import Content from './components/content/content'
import DashboardContext from './context/dashboard-context'
import { useOrders } from './api/orders/useOrders'
import { useUploadedImages } from './api/gallery/useUploadedImages'
import { useGallery } from '../../common/api/use-gallery'
import { useDimensions } from '../../common/api/use-dimensions'
import { useCategories } from '../../common/api/use-categories'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'
import { useVouchers } from '../../common/api/use-vouchers'
import { useMaterials } from 'common/api/use-materials'

const CustomDashboard = () => {
  const { data: uploadImages = [], isFetching: isFetchingUpload } =
    useUploadedImages()
  const { data: orders = [], isFetching: isFetchingOrders } = useOrders()
  const { data: galleryImages = [], isFetching: isFetchingGallery } =
    useGallery()
  const { data: dimensions = [], isFetching: isFetchingDimensions } =
    useDimensions()
  const { data: categories = [], isFetching: isFetchingCategories } =
    useCategories()
  const { data: categoriesEshop = [], isFetching: isFetchingCategoriesEshop } =
    useCategoriesEshop()
  const { data: vouchers = [], isFetching: isFetchingVouchers } = useVouchers()
  const { data: materials = [], isFetching: isFetchingMaterials } =
    useMaterials()

  return (
    <DashboardContext.Provider
      value={{
        state: {
          uploadImages,
          orders,
          galleryImages,
          dimensions,
          categories,
          categoriesEshop,
          vouchers,
          materials,
        },
      }}
    >
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <Content
          isFetching={
            isFetchingUpload ||
            isFetchingOrders ||
            isFetchingGallery ||
            isFetchingDimensions ||
            isFetchingCategories ||
            isFetchingCategoriesEshop ||
            isFetchingVouchers ||
            isFetchingMaterials
          }
        />
      </div>
    </DashboardContext.Provider>
  )
}

export default CustomDashboard
