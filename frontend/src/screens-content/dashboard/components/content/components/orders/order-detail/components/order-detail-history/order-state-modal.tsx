import { Box, Button, Modal } from '@mui/material'
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
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h3>Zmena stavu objednávky</h3>
        <div>
          Chystáte sa zmeniť stav objednávky na
          <p style={{ fontWeight: 700 }}>{title}</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant='outlined' onClick={closeModal}>
            Zrušiť
          </Button>
          <Button variant='outlined' onClick={save} style={{ marginLeft: 10 }}>
            Potvrdit
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateOrderState
