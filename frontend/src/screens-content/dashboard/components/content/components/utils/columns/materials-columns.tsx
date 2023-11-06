import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'
import { localizationKey } from '../../../../../../../localization/localization-key'

// TODO: fix any
export const getMaterialsColumns = (t: any): any => [
  {
    field: 'title',
    headerName: t(localizationKey.materials),
    width: 200,
    editable: false,
  },
  {
    headerName: 'Available',
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderHeader: () => (
      <div style={{ textAlign: 'center' }}>
        {t(localizationKey.availability)}
      </div>
    ),
    width: 100,
  },
  {
    field: 'delivery',
    headerName: 'Doručenie',
    width: 500,
    editable: true,
  },
]
