import styles from '../../../../../../../../dashboard.module.scss'
import { localizationKey } from '../../../../../../../../../../localization/localization-key'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

const Limit = () => {
  const { t } = useTranslation()

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormInputs>()

  return (
    <div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>
          {t(localizationKey.voucherLimit)}
        </p>
        <Controller
          key={'limit'}
          name={'limit'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...register('limit', { required: false })}
              error={!!errors.limit?.message}
              helperText={errors.limit?.message}
              type='number'
              size='small'
              placeholder={t(localizationKey.noLimit)}
              sx={{ ml: 1, width: 300 }}
            />
          )}
        />
      </div>
      <div className={styles.voucherGeneralRow}>
        <p className={styles.voucherGeneralText}>
          {t(localizationKey.voucherLimitUser)}
        </p>
        <Controller
          key={'limitUser'}
          name={'limitUser'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...register('limitUser', { required: false })}
              error={!!errors.limitUser?.message}
              helperText={errors.limitUser?.message}
              type='number'
              size='small'
              placeholder={t(localizationKey.noLimit)}
              sx={{ ml: 1, width: 300 }}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Limit
