import styles from '../../../../../../../../dashboard.module.scss'
import { localizationKey } from '../../../../../../../../../../localization/localization-key'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import { FormInputs } from '../../voucher-detail'

const Strict = () => {
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
          {t(localizationKey.minimal)}
        </p>
        <Controller
          key={'minimalValue'}
          name={'minimalValue'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...register('minimalValue', { required: false })}
              error={!!errors.minimalValue?.message}
              helperText={errors.minimalValue?.message}
              type='number'
              size='small'
              sx={{ ml: 1, width: 200 }}
              placeholder={t(localizationKey.noMinimal)}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Strict
