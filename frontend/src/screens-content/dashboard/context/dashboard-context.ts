import { createContext } from 'react'
import { StorageReference } from '@firebase/storage'
import { Order } from '../../../common/types/order'
import { GalleryItem } from '../../../common/types/gallery'
import { DimensionType } from '../../../common/api/use-dimensions'
import { CategoryType } from '../../../common/api/use-categories'
import { VoucherType } from '../../../common/api/use-vouchers'
import { MaterialType } from 'common/api/use-materials'
import { ProductsType } from '../../../common/api/use-products'

type DashboardContextProps = {
  state: {
    uploadImages: StorageReference[]
    orders: Order[]
    galleryImages: GalleryItem[]
    dimensions: DimensionType[]
    categories: CategoryType[]
    categoriesEshop: CategoryType[]
    vouchers: VoucherType[]
    materials: MaterialType[]
    products: ProductsType[]
  }
}

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
)

export default DashboardContext
