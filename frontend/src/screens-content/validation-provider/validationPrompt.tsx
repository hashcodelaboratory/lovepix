import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'

export type validationPromptProps = {
  title: string
  description: string
  callback: (value: boolean) => void
  canDismiss?: boolean
  defaultReturn?: boolean
  open: boolean
  closeDialog: () => void
}

export const ValidationPrompt = ({
  title,
  description,
  callback,
  canDismiss,
  defaultReturn,
  open,
  closeDialog,
}: validationPromptProps) => {
  const { t } = useTranslation()
  const actionButtons = [
    { value: false, name: localizationKey.validationBtnFalse },
    { value: true, name: localizationKey.validationBtnTrue },
  ]

  const handleClose = (value: boolean) => () => {
    closeDialog()
    callback(value)
  }

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={canDismiss ? handleClose(!!defaultReturn) : undefined}
    >
      <DialogTitle id='alert-dialog-title'>{t(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t(description)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actionButtons.map(({ value, name }) => (
          <Button
            onClick={handleClose(value)}
            variant={defaultReturn === value ? 'contained' : 'outlined'}
          >
            {t(name)}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  )
}
