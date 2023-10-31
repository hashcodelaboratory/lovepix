import { GridColDef } from '@mui/x-data-grid'
import { MATERIALS } from '../../../../../../home/utils/materials'
import { TFunction } from 'react-i18next'

export const getDimensionsColumns = (
  t: TFunction<'translation'>
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Názov',
    width: 200,
    editable: false,
  },
  ...MATERIALS.map((material) => ({
    field: `price.${material.type}`,
    headerName: `Cena za ${t(material.title)}`,
    width: 300,
    editable: true,
    renderCell: (a: any) => <div>{a.row.price[material.type]}</div>,
  })),
]
