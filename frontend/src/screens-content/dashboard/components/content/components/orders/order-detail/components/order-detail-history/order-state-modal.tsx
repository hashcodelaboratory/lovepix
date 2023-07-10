import { Box, Button, Modal } from '@mui/material'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import React from 'react'

type ModalProps = {
  open: boolean
  closeModal: () => void
  save: () => void
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

const UpdateOrderState = ({ open, closeModal, save, title }: ModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h3>{t(messages.changeOrderState)}</h3>
        <div>
          {t(messages.changeOrderStateSubtitle)}
          <p style={{ fontWeight: 700 }}>{title}</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant='outlined' onClick={closeModal}>
            {t(messages.cancel)}
          </Button>
          <Button variant='outlined' onClick={save} style={{ marginLeft: 10 }}>
            {t(messages.confirm)}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateOrderState
