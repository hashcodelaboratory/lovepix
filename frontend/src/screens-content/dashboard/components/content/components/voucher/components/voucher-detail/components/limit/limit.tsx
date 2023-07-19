import styles from '../../../../../../../../dashboard.module.scss'
import { messages } from '../../../../../../../../../../messages/messages'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const Limit = () => {
  const { t } = useTranslation()

  const [value, setValue] = useState<number>()

  return (
    <div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.voucherLimit)}</p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1, width: 300 }}
          placeholder={t(messages.noLimit)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>
          {t(messages.voucherLimitUser)}
        </p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1, width: 300 }}
          placeholder={t(messages.noLimit)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Limit
