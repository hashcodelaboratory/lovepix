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
    width: 200,
    editable: false,
  },
  {
    field: 'name',
    headerName: t(localizationKey.dimension),
    width: 200,
    editable: false,
  },
  ...MATERIALS.map((material) => ({
    field: `price.${material.type}`,
    headerName: `${t(localizationKey.priceFor) + t(material.title)}`,
    width: 300,
    editable: true,
    renderCell: (a: any) => <div>{a.row.price?.[material.type] ?? '-'}</div>,
  })),
]
