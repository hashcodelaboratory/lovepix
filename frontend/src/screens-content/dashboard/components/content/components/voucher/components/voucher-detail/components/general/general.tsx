import styles from '../../../../../../../../dashboard.module.scss'
import { Checkbox, FormControlLabel, Select, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { messages } from '../../../../../../../../../../messages/messages'
import MenuItem from '@mui/material/MenuItem'
import { SaleTypeEnum } from '../../../../../../../../../../common/voucher/utils/enums'
import { Controller, Control, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

type GeneralProps = {
  control: Control<FormInputs>
  register: UseFormRegister<FormInputs>
  errors: any
}
const General = ({ control, register, errors }: GeneralProps) => {
  const { t } = useTranslation()

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
        <Controller
          key={'value'}
          name={'value'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...register('value', { required: true })}
              error={!!errors.value?.message}
              helperText={errors.value?.message}
              type='number'
              size='small'
              sx={{ ml: 1 }}
              placeholder='0'
            />
          )}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.deliveryFree)}</p>
        <Controller
          key={'freeDelivery'}
          name={'freeDelivery'}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              {...register('freeDelivery', { required: true })}
              control={<Checkbox sx={{ ml: 1 }} />}
              label={t(messages.deliveryFree)}
            />
          )}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>{t(messages.expiration)}</p>
        <Controller
          key={'expiration'}
          name={'expiration'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...register('expiration', { required: true })}
              error={!!errors.expiration?.message}
              helperText={errors.expiration?.message}
              type='date'
              size='small'
              sx={{ ml: 1 }}
            />
          )}
        />
      </div>
    </div>
  )
}

export default General
