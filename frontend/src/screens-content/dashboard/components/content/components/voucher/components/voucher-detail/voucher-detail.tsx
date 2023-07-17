import styles from '../../../../../../dashboard.module.scss'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

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
    </div>
  )
}

export default VoucherDetail
