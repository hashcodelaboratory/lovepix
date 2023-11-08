import { GridColDef } from '@mui/x-data-grid'
import { MATERIALS } from '../../../../../../home/utils/materials'
import { TFunction } from 'react-i18next'
import { localizationKey } from '../../../../../../../localization/localization-key'

export const getDimensionsColumns = (
  t: TFunction<'translation'>
): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    width: 140,
    editable: false,
    renderCell: (a: any) => <div style={{ fontWeight: 100 }}>{a.row.id}</div>,
  },
  {
    field: 'name',
    headerName: t(localizationKey.dimension),
    width: 120,
    editable: false,
    renderCell: (a: any) => <div style={{ fontWeight: 600 }}>{a.row.name}</div>,
  },
  ...MATERIALS.map((material) => ({
    field: `price.${material.type}`,
    headerName: `${t(localizationKey.priceFor) + t(material.title)}`,
    width: 240,
    editable: true,
    renderCell: (a: any) => <div>{a.row.price?.[material.type] ?? '-'} €</div>,
  })),
]
