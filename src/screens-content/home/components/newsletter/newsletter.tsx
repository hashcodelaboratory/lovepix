import styles from "./newsletter.module.scss"
import { useTranslation } from "react-i18next";
import { messages } from "../../../../messages/messages";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";

const Newsletter = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.border}>
          <p className={styles.title}>{String(t(messages.newsletterLogin))}</p>
          <p className={styles.subtitle}>{String(t(messages.newsletterGet))}</p>
          <div className={styles.row}>
            <p className={styles.textFieldText}>{String(t(messages.putMail))}</p>
            <p className={styles.textFieldTextSecondary}>{String(t(messages.logout))}</p>
          </div>
          <TextField
            placeholder={String(t(messages.yourMail))}
            fullWidth
            variant="outlined"
            size="small"
            className={styles.formField}
            sx={{ width: "80%" }}
          />
          <button className={styles.button}>
            {String(t(messages.login))}
          </button>
          <p className={styles.note}>
            {String(t(messages.newsletter))}
            <p className={styles.noteLink}>{String(t(messages.here))}</p>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Newsletter;