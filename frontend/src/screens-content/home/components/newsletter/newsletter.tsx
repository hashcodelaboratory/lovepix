import styles from './newsletter.module.scss'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import Container from '@mui/material/Container'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { addContactToNewsletter } from '../../../../common/api/add-contact-newsletter'
import { useSnackbar } from 'notistack'
import { SNACKBAR_OPTIONS_SUCCESS } from '../../../../snackbar/config'

const Newsletter = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState<string>('')

  const handleNewsletter = async () => {
    const res = await addContactToNewsletter(email)
    if (res) {
      enqueueSnackbar(
        String(t(localizationKey.newsletterSuccessAdd)),
        SNACKBAR_OPTIONS_SUCCESS
      )
    }
  }

  return (
    <div className={styles.layout}>
      <Container>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.title}>
              {String(t(localizationKey.newsletterLogin))}
            </p>
            <p className={styles.subtitle}>
              {String(t(localizationKey.newsletterGet))}
            </p>
            <div className={styles.row}>
              <p className={styles.textFieldText}>
                {String(t(localizationKey.putMail))}
              </p>
              <p className={styles.textFieldTextSecondary}>
                {String(t(localizationKey.logout))}
              </p>
            </div>
            <div className={styles.row}>
              <TextField
                placeholder={String(t(localizationKey.yourMail))}
                fullWidth
                variant='standard'
                size='small'
                sx={{
                  width: '70%',
                  backgroundColor: 'white',
                  padding: 0.8,
                  marginRight: 1,
                  borderRadius: 2,
                  '& .MuiInput-root': {
                    '&:before, :after, :hover:not(.Mui-disabled):before': {
                      borderBottom: 0,
                    },
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={styles.button} onClick={handleNewsletter}>
                {String(t(localizationKey.login))}
              </button>
            </div>
            <p className={styles.note}>
              {String(t(localizationKey.newsletter))}
              <span className={styles.noteLink}>
                {String(t(localizationKey.here))}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Newsletter
