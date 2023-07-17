import styles from '../../../../../../dashboard.module.scss'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import HideSourceIcon from '@mui/icons-material/HideSource'
import MultipleStopIcon from '@mui/icons-material/MultipleStop'

const VoucherDetail = () => {
  return (
    <div className={styles.voucherDetailBox}>
      <div>
        <p className={styles.voucherDetailInputText}>Kód kupónu</p>
        <div>
          <TextField size='small' sx={{ mr: 1 }} placeholder='LOVEPIX10' />
          <Button variant='contained'>Generovať kód kupónu</Button>
        </div>
        <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
          Popis kupónu
        </p>
        <TextField
          size='small'
          multiline
          fullWidth
          rows={3}
          placeholder='Popis kupónu'
        />
      </div>
      <div>
        <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
          Údaje kupónu
        </p>
        <div>
          <div className={styles.voucherDetailListRow}>
            <SettingsIcon sx={{ mr: 1 }} />
            <p>Všeobecné</p>
          </div>
          <div className={styles.voucherDetailListRow}>
            <HideSourceIcon sx={{ mr: 1 }} />
            <p>Obmedzenie použitia</p>
          </div>
          <div className={styles.voucherDetailListRow}>
            <MultipleStopIcon sx={{ mr: 1 }} />
            <p>Limit využitia</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoucherDetail
