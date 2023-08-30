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
  buttonTrue: () => void
  buttonFalse: () => void
  onClose?: () => void
  defaultReturn?: boolean
  open: boolean
}

export const ConfirmationModal = ({
  title,
  description,
  link,
  buttonTrue,
  buttonFalse,
  onClose,
  defaultReturn,
  open,
}: confirmationModalProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ className: styles.confirmationModal }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
            {link ? <Link href={link.href}>{link.text}</Link> : undefined}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => buttonFalse()}
            variant={defaultReturn ? 'outlined' : 'contained'}
          >
            {t(localizationKey.confirmationBtnFalse)}
          </Button>
          <Button
            onClick={() => buttonTrue()}
            variant={!defaultReturn ? 'outlined' : 'contained'}
          >
            {t(localizationKey.confirmationBtnTrue)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
