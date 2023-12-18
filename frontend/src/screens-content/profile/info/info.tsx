import styles from '../profile.module.scss'
import useLoggedUser from '../../../common/api/use-logged-user'

const Info = () => {
  const { user } = useLoggedUser()

  const lastSignDate = new Date(user?.metadata?.lastSignInTime ?? '')

  return (
    <>
      <div className={styles.contentRow}>
        <p>Prihlasovací e-mail:</p>
        <p>{user?.email}</p>
      </div>
      <div className={styles.contentRow}>
        <p>Kontaktný e-mail:</p>
        <p>{user?.email}</p>
      </div>
      <div className={styles.contentRow}>
        <p>Telefón:</p>
        <p>{user?.phoneNumber ?? 'Žiadny údaj'}</p>
      </div>
      <div className={styles.contentRow}>
        <p>Naposledy prihlásený:</p>
        <p>
          {`${lastSignDate.toLocaleDateString()} ${lastSignDate.toLocaleTimeString()}` ??
            'Žiadny údaj'}
        </p>
      </div>
    </>
  )
}

export default Info
