import styles from './newsletter.module.scss'
import { useTranslation } from 'react-i18next'
import { messages } from '../../../../messages/messages'
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
        String(t(messages.newsletterSuccessAdd)),
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
              {String(t(messages.newsletterLogin))}
            </p>
            <p className={styles.subtitle}>
              {String(t(messages.newsletterGet))}
            </p>
            <div className={styles.row}>
              <p className={styles.textFieldText}>
                {String(t(messages.putMail))}
              </p>
              <p className={styles.textFieldTextSecondary}>
                {String(t(messages.logout))}
              </p>
            </div>
            <div className={styles.row}>
              <TextField
                placeholder={String(t(messages.yourMail))}
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
                {String(t(messages.login))}
              </button>
            </div>
            <p className={styles.note}>
              {String(t(messages.newsletter))}
              <span className={styles.noteLink}>
                {String(t(messages.here))}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Newsletter
