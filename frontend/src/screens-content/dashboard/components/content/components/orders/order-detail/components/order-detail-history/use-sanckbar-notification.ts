import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { messages } from 'messages/messages'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'

export const useSnackBarNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const snackBarNotification = (response: Response) => {
    if (response.ok) {
      enqueueSnackbar(t(messages.orderStateSnackbar), SNACKBAR_OPTIONS_SUCCESS)
    } else {
      enqueueSnackbar(t(messages.emailErrorSnackbar), SNACKBAR_OPTIONS_ERROR)
    }
    setTimeout(() => {
      closeSnackbar()
    }, 3000)
  }

  return { snackBarNotification }
}
