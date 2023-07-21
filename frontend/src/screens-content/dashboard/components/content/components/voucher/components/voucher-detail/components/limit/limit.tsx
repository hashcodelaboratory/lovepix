import styles from '../../../../../../../../dashboard.module.scss'
import { localizationKey } from '../../../../../../../../../../localization/localization-key'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Control, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

type LimitProps = {
  control: Control<FormInputs>
  register: UseFormRegister<FormInputs>
  errors: any
}

const Limit = ({ control, register, errors }: LimitProps) => {
  const { t } = useTranslation()

  const [value, setValue] = useState<number>()

  return (
    <div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>
          {t(localizationKey.voucherLimit)}
        </p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1, width: 300 }}
          placeholder={t(localizationKey.noLimit)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>
          {t(localizationKey.voucherLimitUser)}
        </p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1, width: 300 }}
          placeholder={t(localizationKey.noLimit)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Limit
