import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import styles from '../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'

type CheckboxProps = {
  value: boolean
  setValue: () => void
  message: string
  labelLink?: string
  linkTitle?: string
}

const CheckboxShoppingCart = ({ value, setValue, message }: CheckboxProps) => {
  const { t } = useTranslation()

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onClick={setValue}
          sx={{
            lineHeight: '0px',
            color: '#606060',
            '&.Mui-checked': {
              color: '#D32F2F',
            },
          }}
        />
      }
      label={<div className={styles.checkboxLabel}>{t(message)}</div>}
    />
  )
}

export default CheckboxShoppingCart
