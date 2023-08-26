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
import styles from './confirmationDialog.module.scss'
import { v4 as uuidv4 } from 'uuid'

export type confirmationDialogProps = {
  title: string | JSX.Element
  description: string | JSX.Element
  callback: (value: boolean) => void
  canDismiss?: boolean
  defaultReturn?: boolean
  open: boolean
  closeDialog: () => void
  children: JSX.Element
}

export const ConfirmationDialog = ({
  title,
  description,
  callback,
  canDismiss,
  defaultReturn,
  open,
  closeDialog,
  children,
}: confirmationDialogProps) => {
  const { t } = useTranslation()

  const actionButtons = [
    { value: false, name: localizationKey.confirmationBtnFalse },
    { value: true, name: localizationKey.confirmationBtnTrue },
  ]

  const handleClose = (value: boolean) => () => {
    closeDialog()
    callback(value)
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={canDismiss ? handleClose(!!defaultReturn) : undefined}
        PaperProps={{ className: styles.validationDialog }}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actionButtons.map(({ value, name }) => (
            <Button
              key={uuidv4()}
              onClick={handleClose(value)}
              variant={defaultReturn === value ? 'contained' : 'outlined'}
            >
              {t(name)}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
      {children}
    </>
  )
}
