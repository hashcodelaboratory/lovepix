import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import styles from '../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'

type CheckboxProps = {
  value: boolean
  setValue: () => void
  message: string
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
            color: '#606060',
            '&.Mui-checked': {
              color: '#D32F2F',
            },
          }}
        />
      }
      label={
        <span className={styles.text} style={{ fontSize: 12 }}>
          {t(message)}
        </span>
      }
    />
  )
}

export default CheckboxShoppingCart
