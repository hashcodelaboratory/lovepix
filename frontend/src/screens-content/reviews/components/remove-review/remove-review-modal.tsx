import { Backdrop, Box, Button, CircularProgress, Modal } from '@mui/material'
import { useRemoveReview } from 'common/api/remove-review'
import { REVIEWS_KEY } from 'common/api/use-reviews'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useQueryClient } from 'react-query'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'

type ModalProps = {
  open: boolean
  closeModal: () => void
  title: string
  id: string
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

const RemoveReviewModal = ({ open, closeModal, title, id }: ModalProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate: removeReview, isLoading } = useRemoveReview({
    onSuccess: () => {
      enqueueSnackbar(
        String('Recenzia bola vymazaná'),
        SNACKBAR_OPTIONS_SUCCESS
      )
      closeModal()
      queryClient.invalidateQueries(REVIEWS_KEY)
    },
    onError: () => {
      enqueueSnackbar(
        String('Recenziu sa nepodarilo vymazať'),
        SNACKBAR_OPTIONS_ERROR
      )
      queryClient.invalidateQueries(REVIEWS_KEY)
    },
  })

  const save = () => removeReview({ id })

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h3>Chystáte sa vymazať recenziu používateľa {title}</h3>
          <div style={{ marginTop: 20 }}>
            <Button variant='outlined' onClick={closeModal}>
              {t(localizationKey.cancel)}
            </Button>
            <Button
              variant='outlined'
              style={{ marginLeft: 10 }}
              onClick={save}
            >
              {t(localizationKey.confirm)}
            </Button>
          </div>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default RemoveReviewModal
