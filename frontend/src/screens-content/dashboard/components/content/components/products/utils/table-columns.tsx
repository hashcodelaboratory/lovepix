import { GridColDef } from '@mui/x-data-grid'
import { QueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../products.module.scss'
import Image from 'next/image'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { removeUploadedProductImage } from '../../../../../../../common/api/remove-product'
import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { CategoryEshopType } from '../../../../../../../common/api/use-categories-eshop'

export const getProductsColumns = (
  queryClient: QueryClient,
  categories?: CategoryEshopType[]
): GridColDef[] => [
  {
    field: 'image',
    headerName: 'Ukážka',
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
    headerName: 'Názov',
    width: 300,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Kategória',
    width: 160,
    editable: true,
    type: 'singleSelect',
    valueOptions: categories?.map(({ name }) => name),
  },
  {
    field: 'count',
    headerName: 'Počet',
    width: 70,
    editable: true,
    renderCell: ({ value }) => <div>{value} ks</div>,
  },
  {
    field: 'price',
    headerName: 'Cena',
    width: 80,
    editable: true,
    renderCell: ({ value }) => <div>{value} €</div>,
  },
  {
    field: 'id',
    headerName: 'Odstrániť',
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
