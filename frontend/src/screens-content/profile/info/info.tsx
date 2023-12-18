import styles from '../profile.module.scss'

const Info = () => {
  return (
    <>
      <div className={styles.contentRow}>
        <p>Prihlasovací e-mail:</p>
        <p>mihal.dz17@gmail.com</p>
      </div>
      <div className={styles.contentRow}>
        <p>Kontaktný e-mail:</p>
        <p>mihal.dz17@gmail.com</p>
      </div>
      <div className={styles.contentRow}>
        <p>Telefón:</p>
        <p>+421 944 186 068</p>
      </div>
    </>
  )
}

export default Info
