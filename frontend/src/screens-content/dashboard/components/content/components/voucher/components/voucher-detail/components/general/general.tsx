import styles from '../../../../../../../../dashboard.module.scss'
import {
  Checkbox,
  FormControlLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { messages } from '../../../../../../../../../../messages/messages'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { SaleTypeEnum } from '../../../../../../../../../../common/voucher/utils/enums'
import { Controller, useForm } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

const General = () => {
  const { t } = useTranslation()
  const {
    control,
    register,
    formState: { errors },
  } = useForm<FormInputs>()

  const [sale, setSale] = useState<SaleTypeEnum>(SaleTypeEnum.PERCENTAGE)
  const [value, setValue] = useState<number>()
  const [expiration, setExpiration] = useState<string>()

  const changeSale = (e: SelectChangeEvent) => {
    console.log(e)
    setSale(e.target.value as SaleTypeEnum)
  }

  return (
    <div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.saleType)}</p>
        <Controller
          key={'saleType'}
          name={'saleType'}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              {...register('saleType', { required: true })}
              error={!!errors.saleType?.message}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              sx={{ ml: 1, width: 300 }}
              size='small'
              placeholder={SaleTypeEnum.PERCENTAGE}
            >
              <MenuItem value={SaleTypeEnum.PERCENTAGE}>
                {t(messages[SaleTypeEnum.PERCENTAGE])}
              </MenuItem>
              <MenuItem value={SaleTypeEnum.FIX_CART}>
                {t(messages[SaleTypeEnum.FIX_CART])}
              </MenuItem>
              <MenuItem value={SaleTypeEnum.FIX_PRODUCT}>
                {t(messages[SaleTypeEnum.FIX_PRODUCT])}
              </MenuItem>
            </Select>
          )}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.voucherValue)}</p>
        <TextField
          type='number'
          size='small'
          sx={{ ml: 1 }}
          placeholder='0'
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.deliveryFree)}</p>
        <FormControlLabel
          control={<Checkbox sx={{ ml: 1 }} />}
          label={t(messages.deliveryFree)}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.expiration)}</p>
        <TextField
          type='date'
          size='small'
          sx={{ ml: 1 }}
          onChange={(e) => setExpiration(e.target.value)}
        />
      </div>
    </div>
  )
}

export default General
