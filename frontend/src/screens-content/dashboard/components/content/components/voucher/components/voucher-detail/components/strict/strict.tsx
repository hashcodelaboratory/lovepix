import styles from '../../../../../../../../dashboard.module.scss'
import { messages } from '../../../../../../../../../../messages/messages'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Control, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

type StrictProps = {
  control: Control<FormInputs>
  register: UseFormRegister<FormInputs>
  errors: any
}
const Strict = ({ control, register, errors }: StrictProps) => {
  const { t } = useTranslation()

  const [value, setValue] = useState<number>()

  return (
    <div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.minimal)}</p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1, width: 200 }}
          placeholder={t(messages.noMinimal)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Strict
