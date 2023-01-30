import { createContext } from 'react'
import { StorageReference } from '@firebase/storage'
import { Order } from '../../../common/types/order'

type DashboardContextProps = {
  state: {
    uploadedImages: StorageReference[]
    orders: Order[]
  }
}

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
)

export default DashboardContext
