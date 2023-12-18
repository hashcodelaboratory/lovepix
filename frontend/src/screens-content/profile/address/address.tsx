import styles from '../profile.module.scss'
import RoomIcon from '@mui/icons-material/Room'
import CloseIcon from '@mui/icons-material/Close'

const Address = () => {
  return (
    <>
      <div className={styles.addressRow}>
        <div className={styles.addressCard}>
          <div className={styles.addressRow}>
            <RoomIcon
              sx={{
                borderRadius: '50%',
                backgroundColor: '#E81A40',
                padding: 1,
                color: 'white',
                marginRight: 2,
                height: 40,
                width: 40,
              }}
            />
            <div>
              <p>
                <b>Meno Priezvisko</b>
              </p>
              <p>Ulica 15</p>
              <p>05201 Spisska Nova Ves</p>
              <p>+421 944 123 456</p>
            </div>
          </div>
          <CloseIcon sx={{ color: 'gray', marginLeft: 2, cursor: 'pointer' }} />
        </div>
        <div className={styles.addressCard}>
          <div className={styles.addressRow}>
            <RoomIcon
              sx={{
                borderRadius: '50%',
                backgroundColor: '#E81A40',
                padding: 1,
                color: 'white',
                marginRight: 2,
                height: 40,
                width: 40,
              }}
            />
            <div>
              <p>
                <b>Meno Priezvisko</b>
              </p>
              <p>Ulica 15</p>
              <p>05201 Spisska Nova Ves</p>
              <p>+421 944 123 456</p>
            </div>
          </div>
          <CloseIcon sx={{ color: 'gray', marginLeft: 2, cursor: 'pointer' }} />
        </div>
      </div>
    </>
  )
}

export default Address
