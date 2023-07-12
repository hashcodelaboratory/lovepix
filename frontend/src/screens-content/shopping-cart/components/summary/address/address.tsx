import styles from '../../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../../messages/messages'
import Form from './components/form/form'
import { FormInputs } from '../../../../../common/types/form'
import { Control, FieldErrors } from 'react-hook-form'
import CompanyFrom from './components/form/company-form'
import FormShippingAddress from './components/form/shipping-address-form'
import { TextField } from '@mui/material'

type CartProps = {
  register: any
  errors: FieldErrors<FormInputs>
  control: Control<FormInputs>
}

const Address = ({ register, errors, control }: CartProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>
          {String(t(messages.invoiceAddress))}
        </h3>
      </div>
      <Form register={register} errors={errors} control={control} />
      <TextField
        id='outlined-multiline-static'
        label={'Poznámka pre predajcu'}
        multiline
        margin='normal'
        fullWidth
        {...register('note')}
        rows={4}
      />
      <CompanyFrom register={register} errors={errors} control={control} />
      <FormShippingAddress
        register={register}
        errors={errors}
        control={control}
      />
    </div>
  )
}

export default Address
