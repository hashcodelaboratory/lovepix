import { Box, Button, Modal } from '@mui/material'
import React from 'react'

type ModalProps = {
  open: boolean
  closeModal: () => void
  save: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

const UpdateOrderState = ({ open, closeModal, save }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h3>Zmena stavu objednávky</h3>
        <div>Chystáte sa zmeniť stav objednávky z STAV na NOVY STAV</div>
        <div style={{ marginTop: 20 }}>
          <Button variant='outlined' onClick={save}>
            Potvrdit
          </Button>
          <Button variant='outlined' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateOrderState
