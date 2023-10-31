import { FC, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { doc, setDoc } from '@firebase/firestore'
import { database } from '../../../../../../../../common/firebase/config'
import { Collections } from '../../../../../../../../common/firebase/enums'
import { DIMENSIONS_KEY } from '../../../../../../../../common/api/use-dimensions'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

type AddDimensionModalProps = {
  isOpen: boolean
  close: () => void
}

const AddDimensionModal: FC<AddDimensionModalProps> = ({ isOpen, close }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [dimensionLabel, setDimensionLabel] = useState<string>()

  const uploadToFirestore = async () => {
    await setDoc(
      doc(database, Collections.DIMENSIONS, `DIM-${dimensionLabel?.trim()}`),
      {
        name: dimensionLabel,
      }
    )
    queryClient.invalidateQueries(DIMENSIONS_KEY)
    close()
  }

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
        <Button onClick={uploadToFirestore}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDimensionModal
