import { Box, Button, Modal, Typography } from '@mui/material'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import React from 'react'

type ModalProps = {
  open: boolean
  closeModal: () => void
  title: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

const RemoveReviewModal = ({ open, closeModal, title }: ModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h3>Chystate sa vymazat recenziu</h3>
        <div style={{ marginTop: 20 }}>
          <Button variant='outlined' onClick={closeModal}>
            {t(localizationKey.cancel)}
          </Button>
          <Button variant='outlined' style={{ marginLeft: 10 }}>
            {t(localizationKey.confirm)}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default RemoveReviewModal
