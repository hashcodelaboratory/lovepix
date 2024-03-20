import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../../../snackbar/config'

export const useSnackBarNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const snackBarNotification = (
    response: Response,
    successMessage: string,
    errorMessage: string
  ) => {
    if (response.ok) {
      enqueueSnackbar(t(successMessage), SNACKBAR_OPTIONS_SUCCESS)
    } else {
      enqueueSnackbar(t(errorMessage), SNACKBAR_OPTIONS_ERROR)
    }
    setTimeout(() => {
      closeSnackbar()
    }, 3000)
  }

  return { snackBarNotification }
}
