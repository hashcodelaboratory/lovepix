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

export type LinkPropsType = {
  href: string
  text: string
}

export type ConfirmationModalProps = {
  title: string
  description: string
  link?: LinkPropsType
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
}: ConfirmationModalProps) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: styles.confirmationModal }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
          {link && <Link href={link.href}>{link.text}</Link>}
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
  )
}
