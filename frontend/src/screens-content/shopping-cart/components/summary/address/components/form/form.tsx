import { TextField } from '@mui/material'
import styles from '../../../../../shopping-cart.module.scss'
import { Controller, FieldErrors, Control } from 'react-hook-form'
import { localizationKey } from '../../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { FormInputs } from '../../../../../../../common/types/form'

type FormProps = {
  register: any
  errors: FieldErrors<FormInputs>
  control: Control<FormInputs>
}

type ControllerFieldType = {
  name:
    | 'firstName'
    | 'lastName'
    | 'company'
    | 'address'
    | 'city'
    | 'postalCode'
    | 'phone'
    | 'email'
    | 'delivery'
    | 'payment'
  message: string
  error?: string
  fullWidth?: boolean
}

const Form = ({ register, errors, control }: FormProps): JSX.Element => {
  const { t } = useTranslation()

  const FIELDS: ControllerFieldType[] = [
    {
      name: 'firstName',
      message: localizationKey.name,
      error: errors.firstName?.message,
      fullWidth: true,
    },
    {
      name: 'lastName',
      message: localizationKey.surname,
      error: errors.lastName?.message,
      fullWidth: true,
    },
    {
      name: 'email',
      message: localizationKey.email,
      error: errors.email?.message,
      fullWidth: true,
    },

    {
      name: 'phone',
      message: localizationKey.phone,
      error: errors.phone?.message,
      fullWidth: true,
    },
    {
      name: 'address',
      message: localizationKey.address,
      error: errors.address?.message,
      fullWidth: true,
    },
    {
      name: 'city',
      message: localizationKey.city,
      error: errors.city?.message,
      fullWidth: true,
    },
    {
      name: 'postalCode',
      message: localizationKey.postalCode,
      error: errors.postalCode?.message,
      fullWidth: true,
    },
    {
      name: 'company',
      message: localizationKey.company,
      fullWidth: true,
    },
  ]

  const fields = FIELDS.map(({ name, message, error, fullWidth }) => (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field }) => (
        <div style={{ padding: 5 }}>
          <p className={styles.formFieldTitle}>{String(t(message))}</p>
          <TextField
            placeholder={String(t(message))}
            fullWidth={fullWidth}
            {...field}
            {...register(name, { required: true })}
            error={!!error}
            helperText={String(t(error ?? ''))}
            variant='outlined'
            size='small'
            className={styles.formField}
          />
        </div>
      )}
    />
  ))

  return <div className={styles.form}>{fields}</div>
}

export default Form
