import { GridColDef } from '@mui/x-data-grid'
import { QueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './products.module.scss'
import Image from 'next/image'
import { ImageLayout } from '../../../../../home/enums/enums'
import { removeUploadedProductImage } from '../../../../../../common/api/remove-product'

export const getProductsColumns = (queryClient: QueryClient): GridColDef[] => [
  {
    field: 'image',
    headerName: 'Preview',
    width: 80,
    editable: false,
    renderCell: ({ value }) => (
      <Image
        layout={ImageLayout.FIXED}
        width={40}
        height={40}
        src={value}
        alt='img'
      />
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
