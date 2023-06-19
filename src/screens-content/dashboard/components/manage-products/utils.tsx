import { GridColDef } from '@mui/x-data-grid'
import { PRODUCT_KEY } from 'common/api/use-products'
import { database, storage } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'
import { deleteDoc, doc } from 'firebase/firestore'
import Image from 'next/image'
import { QueryClient } from 'react-query'
import { ImageLayout } from 'screens-content/home/enums/enums'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './manage-products.module.scss'
import { StorageFolder } from 'common/firebase/storage/enums'
import { ref, deleteObject } from '@firebase/storage'

const removeProduct = (id: string, queryClient: QueryClient): string => {
  deleteDoc(doc(database, Collections.PRODUCTS, id))
    .then(() => {
      queryClient.invalidateQueries(PRODUCT_KEY)
    })
    .catch((err) => {
      return err
    })
  return ''
}

const removeUploadedProductImage = async (
  id: string,
  name: string,
  queryClient: QueryClient
) => {
  const path = `${StorageFolder.PRODUCTS}/${name}`
  await deleteObject(ref(storage, path))
    .then(() => {
      removeProduct(id, queryClient)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getProductsColumns = (queryClient: QueryClient): GridColDef[] => [
  {
    field: 'image',
    headerName: 'Preview',
    width: 80,
    editable: false,
    renderCell: ({ value }) => (
      <Image layout={ImageLayout.FIXED} width={40} height={40} src={value} />
    ),
  },
  {
    field: 'title',
    headerName: 'Name',
    width: 200,
    editable: false,
  },
  {
    field: 'count',
    headerName: 'count',
    width: 120,
    editable: false,
    renderCell: ({ value }) => <div>{value}</div>,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 80,
    editable: false,
    renderCell: ({ value }) => <div>{value} €</div>,
  },
  {
    field: 'id',
    headerName: 'Remove',
    width: 80,
    editable: false,
    renderCell: (params) => (
      <div
        onClick={() =>
          removeUploadedProductImage(
            params.row.id,
            params.row.path,
            queryClient
          )
        }
        className={styles.deleteProduct}
      >
        <DeleteIcon />
      </div>
    ),
  },
]
