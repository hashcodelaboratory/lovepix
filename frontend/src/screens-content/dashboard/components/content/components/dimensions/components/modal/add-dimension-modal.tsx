import { FC, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DIMENSIONS_KEY } from '../../../../../../../../common/api/use-dimensions'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import { useAddMaterial } from '../../../../../../api/dimensions/add-dimension'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'

type AddDimensionModalProps = {
  isOpen: boolean
  close: () => void
}

const AddDimensionModal: FC<AddDimensionModalProps> = ({ isOpen, close }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const [dimensionLabel, setDimensionLabel] = useState<string>('empty')

  const { mutate: addDimension } = useAddMaterial({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(
          String(t(localizationKey.added)),
          SNACKBAR_OPTIONS_SUCCESS
        )
        queryClient.invalidateQueries(DIMENSIONS_KEY)
        close()
      }
    },
  })

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{t(localizationKey.dimensions)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pridajte rozmer, ktory chcete pouzivat v aplikacii
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Rozmer'
          value={dimensionLabel}
          type='text'
          fullWidth
          variant='standard'
          onChange={(e) => {
            setDimensionLabel(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() =>
            addDimension({
              id: `DIM-${dimensionLabel?.trim()}`,
              name: dimensionLabel,
            })
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDimensionModal
