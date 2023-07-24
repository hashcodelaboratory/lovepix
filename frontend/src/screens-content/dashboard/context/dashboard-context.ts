import { createContext } from 'react'
import { StorageReference } from '@firebase/storage'
import { Order } from '../../../common/types/order'
import { GalleryItem } from '../../../common/types/gallery'
import { DimensionType } from '../../../common/api/use-dimensions'
import { CategoryType } from '../../../common/api/use-categories'

type DashboardContextProps = {
  state: {
    uploadImages: StorageReference[]
    orders: Order[]
    galleryImages: GalleryItem[]
    dimensions: DimensionType[]
    categories: CategoryType[]
    categoriesEshop: CategoryType[]
  }
}

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
)

export default DashboardContext
