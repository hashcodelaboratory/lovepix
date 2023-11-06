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
import { Material } from '../../../../../../../../common/enums/material'

type AddDimensionModalProps = {
  isOpen: boolean
  close: () => void
}

const AddDimensionModal: FC<AddDimensionModalProps> = ({ isOpen, close }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const [dimensionLabel, setDimensionLabel] = useState<string>()
  const [priceDibond, setPriceDibond] = useState<number>()
  const [priceAcrylic, setPriceAcrylic] = useState<number>()
  const [priceCanvas, setPriceCanvas] = useState<number>()
  const [pricePoster, setPricePoster] = useState<number>()

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

  const handleAddDimension = () => {
    if (dimensionLabel) {
      addDimension({
        id: `DIM-${dimensionLabel?.trim()}`,
        name: dimensionLabel,
        price: {
          [Material.DIBOND]: Number(priceDibond),
          [Material.ACRYLIC]: Number(priceAcrylic),
          [Material.POSTER]: Number(pricePoster),
          [Material.CANVAS]: Number(priceCanvas),
        },
      })
    }
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
          placeholder={t(localizationKey.dimension)}
        />
        <TextField
          autoFocus
          margin='dense'
          id={localizationKey.photoCanvasTitle}
          label={`${
            t(localizationKey.priceFor) + t(localizationKey.photoCanvasTitle)
          }`}
          value={priceCanvas}
          fullWidth
          type='number'
          variant='standard'
          onChange={(e) => {
            setPriceCanvas(Number(e.target.value))
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          id={localizationKey.photoAcrylicTitle}
          label={`${
            t(localizationKey.priceFor) + t(localizationKey.photoAcrylicTitle)
          }`}
          value={priceAcrylic}
          type='number'
          fullWidth
          variant='standard'
          onChange={(e) => {
            setPriceAcrylic(Number(e.target.value))
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          id={localizationKey.photoAluminumTitle}
          label={`${
            t(localizationKey.priceFor) + t(localizationKey.photoAluminumTitle)
          }`}
          value={priceDibond}
          type='number'
          fullWidth
          variant='standard'
          onChange={(e) => {
            setPriceDibond(Number(e.target.value))
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          id={localizationKey.photoPosterTitle}
          label={`${
            t(localizationKey.priceFor) + t(localizationKey.photoPosterTitle)
          }`}
          value={pricePoster}
          type='number'
          fullWidth
          variant='standard'
          onChange={(e) => {
            setPricePoster(Number(e.target.value))
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleAddDimension}>{t(localizationKey.add)}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDimensionModal
