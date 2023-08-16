import styles from '../../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../localization/localization-key'
import { styled, TextField } from '@mui/material'
import { useVoucherDetail } from '../../../../../common/api/use-voucher'
import { ChangeEvent, useState } from 'react'
import { orderTable } from '../../../../../../database.config'
import { ORDER_TABLE_KEY } from '../../../../../common/indexed-db/hooks/keys'
import { VoucherType } from '../../../../../common/types/order'

const AddButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error: string | undefined; color?: string }>(({ theme, error }) => ({
  marginBottom: !!error ? 24 : 0,
  marginLeft: '0.5em',
}))

type VoucherProps = {
  voucher?: VoucherType
}
const Voucher = ({ voucher }: VoucherProps) => {
  const { t } = useTranslation()

  const [voucherInput, setVoucherInput] = useState(voucher?.code ?? '')
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState<boolean>()

  const { mutate: getDetail } = useVoucherDetail({
    onSuccess: (res) => {
      if (res.error) {
        setError(t(localizationKey.invalidVoucher))
        orderTable.update(ORDER_TABLE_KEY, {
          voucher: null,
        })
      } else {
        setError(undefined)

        const currentDate = new Date()
        const givenDate = new Date(res.expiration)
        const isValid = currentDate < givenDate
        if (isValid) {
          setIsSuccess(true)
          orderTable.update(ORDER_TABLE_KEY, {
            voucher: {
              code: res.code,
              value: res.value,
              saleType: res.saleType,
            } as VoucherType,
          })
        } else {
          setIsSuccess(false)
        }
      }
    },
  })

  const getVoucherDetail = () => {
    getDetail({ code: voucherInput })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSuccess(false)
    setVoucherInput(e.target.value)
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>
          {String(t(localizationKey.code))}
        </h3>
      </div>
      <div className={styles.voucherRow}>
        <TextField
          className={styles.voucherTextField}
          label={String(t(localizationKey.code))}
          placeholder={t(localizationKey.code)}
          InputLabelProps={{ shrink: true }}
          size='small'
          value={voucherInput}
          onChange={onChange}
          error={!!error}
          helperText={error}
          color={isSuccess ? 'success' : 'primary'}
        />
        <AddButton
          error={error}
          onClick={getVoucherDetail}
          disabled={isSuccess}
          className={styles.defaultButton}
        >
          {String(t(localizationKey.add))}
        </AddButton>
      </div>
    </div>
  )
}

export default Voucher
