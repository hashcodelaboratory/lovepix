import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import styles from '../../../../../shopping-cart.module.scss'
import { Controller, FieldErrors, Control } from 'react-hook-form'
import { messages } from '../../../../../../../messages/messages'
import { useTranslation } from 'next-i18next'
import { FormInputs } from '../../../../../../../common/types/form'
import { useState } from 'react'

type FormProps = {
  register: any
  errors: FieldErrors<FormInputs>
  control: Control<FormInputs>
}

type ControllerFieldType = {
  name:
    | 'firstNameShippingAddress'
    | 'lastNameShippingAddress'
    | 'addressShippingAddress'
    | 'cityShippingAdress'
    | 'postalCodeShippingAddress'
  message: string
  error?: string
  fullWidth?: boolean
}

const FormShippingAddress = ({ register, control }: FormProps): JSX.Element => {
  const { t } = useTranslation()
  const [isShippingAdress, setIsShippingAddress] = useState(false)

  const FIELDS: ControllerFieldType[] = [
    {
      name: 'firstNameShippingAddress',
      message: messages.name,
      fullWidth: true,
    },
    {
      name: 'lastNameShippingAddress',
      message: messages.surname,
      fullWidth: true,
    },
    {
      name: 'addressShippingAddress',
      message: messages.address,
      fullWidth: true,
    },
    {
      name: 'cityShippingAdress',
      message: messages.city,
      fullWidth: true,
    },
    {
      name: 'postalCodeShippingAddress',
      message: messages.postalCode,
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
            {...register(name)}
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

  const handleChangeShippingAddress = () => {
    setIsShippingAddress((prevState) => !prevState)
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isShippingAdress}
            onClick={handleChangeShippingAddress}
            sx={{
              color: '#606060',
              '&.Mui-checked': {
                color: '#D32F2F',
              },
            }}
          />
        }
        label={
          <span className={styles.formFieldTitle}>Doručiť na inú adresu.</span>
        }
      />
      <div className={styles.form}>{isShippingAdress && fields}</div>
    </div>
  )
}

export default FormShippingAddress
