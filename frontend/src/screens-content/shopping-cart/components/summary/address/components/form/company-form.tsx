import { TextField } from '@mui/material'
import styles from '../../../../../shopping-cart.module.scss'
import { Controller, FieldErrors, Control } from 'react-hook-form'
import { messages } from '../../../../../../../messages/messages'
import { useTranslation } from 'next-i18next'
import { FormInputs } from '../../../../../../../common/types/form'
import { useState } from 'react'
import CheckboxShoppingCart from '../../../checkbox-component'

type FormProps = {
  register: any
  errors: FieldErrors<FormInputs>
  control: Control<FormInputs>
}

type ControllerFieldType = {
  name: 'ico' | 'dic'
  message: string
  error?: string
  fullWidth?: boolean
}

const CompanyFrom = ({ register, errors, control }: FormProps): JSX.Element => {
  const { t } = useTranslation()
  const [companyInfo, setCompanyInfo] = useState(false)

  const FIELDS: ControllerFieldType[] = [
    {
      name: 'ico',
      message: messages.ico,
      fullWidth: true,
    },
    {
      name: 'dic',
      message: messages.dic,
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

  const handleChangeCompany = () => {
    setCompanyInfo((prevState) => !prevState)
  }

  return (
    <div>
      <CheckboxShoppingCart
        value={companyInfo}
        setValue={handleChangeCompany}
        message={messages.addCompanyInfo}
      />
      <div className={styles.form}>{companyInfo && fields}</div>
    </div>
  )
}

export default CompanyFrom
