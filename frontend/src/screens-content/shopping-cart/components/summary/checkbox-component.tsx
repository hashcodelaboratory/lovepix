import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import styles from '../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Route } from 'common/enums/routes'

type CheckboxProps = {
  value: boolean
  setValue: () => void
  message: string
  labelLink?: string
}

const CheckboxShoppingCart = ({
  value,
  setValue,
  message,
  labelLink,
}: CheckboxProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const goTo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!labelLink) {
      return
    }
    e.preventDefault()
    router.push(labelLink)
  }

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
      label={
        <div className={styles.checkboxLabel} onClick={(e) => goTo(e)}>
          {t(message)}
        </div>
      }
    />
  )
}

export default CheckboxShoppingCart
