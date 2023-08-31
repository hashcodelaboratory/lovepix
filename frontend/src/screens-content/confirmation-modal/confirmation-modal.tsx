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
  onConfirm: () => void
  onClose: () => void
  defaultReturn?: boolean
  open: boolean
}

export const ConfirmationModal = ({
  title,
  description,
  link,
  onConfirm,
  onClose,
  defaultReturn = true,
  open,
}: ConfirmationModalProps) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} PaperProps={{ className: styles.confirmationModal }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
          {link && <Link href={link.href}>{link.text}</Link>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          variant={defaultReturn ? 'outlined' : 'contained'}
        >
          {t(localizationKey.confirmationBtnFalse)}
        </Button>
        <Button
          onClick={() => onConfirm()}
          variant={defaultReturn ? 'contained' : 'outlined'}
        >
          {t(localizationKey.confirmationBtnTrue)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
