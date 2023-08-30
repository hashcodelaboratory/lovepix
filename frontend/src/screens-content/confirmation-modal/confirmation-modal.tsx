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
import styles from './confirmation-modal.module.scss'
import Link from 'next/link'

export type confirmationModalProps = {
  title: string
  description: string
  link?: { href: string; text: string }
  actionTrue: () => void
  actionFalse: () => void
  actionDismiss?: () => void
  defaultReturn?: boolean
  open: boolean
}

export const ConfirmationModal = ({
  title,
  description,
  link,
  actionTrue,
  actionFalse,
  actionDismiss,
  defaultReturn,
  open,
}: confirmationModalProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Dialog
        open={open}
        onClose={actionDismiss}
        PaperProps={{ className: styles.confirmationModal }}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
            {link ? <Link href={link.href}>{link.text}</Link> : undefined}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => actionFalse()}
            variant={!defaultReturn ? 'contained' : 'outlined'}
          >
            {t(localizationKey.confirmationBtnFalse)}
          </Button>
          <Button
            onClick={() => actionTrue()}
            variant={defaultReturn ? 'contained' : 'outlined'}
          >
            {t(localizationKey.confirmationBtnTrue)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
