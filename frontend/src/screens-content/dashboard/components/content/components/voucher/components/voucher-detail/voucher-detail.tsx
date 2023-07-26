import styles from '../../../../../../dashboard.module.scss'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import HideSourceIcon from '@mui/icons-material/HideSource'
import MultipleStopIcon from '@mui/icons-material/MultipleStop'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import General from './components/general/general'
import Strict from './components/strict/strict'
import Limit from './components/limit/limit'
import { VOUCHERS_KEY } from '../../../../../../../../common/api/use-vouchers'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SaleTypeEnum } from '../../../../../../../../common/voucher/utils/enums'
import { FORM_SCHEMA } from '../../utils/schema'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { useAddVoucher } from '../../../../../../api/vouchers/add-voucher'
import { useVoucherDetail } from '../../../../../../../../common/api/use-voucher'
import { useEditVoucher } from '../../../../../../api/vouchers/edit-voucher'

enum SidePanelEnum {
  GENERAL = 'GENERAL',
  STRICT = 'STRICT',
  LIMIT = 'LIMIT',
}

export type FormInputs = {
  code: string
  description: string
  saleType: SaleTypeEnum
  value: number
  freeDelivery: boolean
  expiration: string
  minimalValue: number
  limit: number
  limitUser: number
}

type VoucherTableRow = {
  id: string
  code: string
  expiration: string
}

type VoucherDetailProps = {
  tableReset: () => void
  detail?: VoucherTableRow
}

const EMPTY_OBJECT = {
  code: '',
  description: '',
  saleType: SaleTypeEnum.DEFAULT,
  value: 0,
  freeDelivery: false,
  expiration: '',
}

const VoucherDetail = ({ tableReset, detail }: VoucherDetailProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { mutate: getVoucherDetail } = useVoucherDetail({
    onSuccess: (data) => {
      if (data.error) {
        enqueueSnackbar(data.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        reset(data)
      }
    },
  })

  useEffect(() => {
    if (detail) {
      getVoucherDetail({ code: detail.code })
    }
  }, [detail])

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(FORM_SCHEMA),
    reValidateMode: 'onChange',
  })

  const [sidePanel, setSidePanel] = useState<SidePanelEnum>(
    SidePanelEnum.GENERAL
  )

  const fullReset = () => {
    reset(EMPTY_OBJECT)
    tableReset()
    queryClient.invalidateQueries(VOUCHERS_KEY)
  }

  const { mutate: addVoucher } = useAddVoucher({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(
          String(t(localizationKey.added)),
          SNACKBAR_OPTIONS_SUCCESS
        )
        fullReset()
      }
    },
  })

  const { mutate: editVoucher } = useEditVoucher({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(
          String(t(localizationKey.added)),
          SNACKBAR_OPTIONS_SUCCESS
        )
        fullReset()
      }
    },
  })

  const detailLayout = useMemo(() => {
    switch (sidePanel) {
      case SidePanelEnum.GENERAL:
        return <General control={control} register={register} errors={errors} />
      case SidePanelEnum.STRICT:
        return <Strict control={control} register={register} errors={errors} />
      case SidePanelEnum.LIMIT:
        return <Limit control={control} register={register} errors={errors} />
    }
  }, [control, errors, register, sidePanel])

  const changeSidePanel = (param: SidePanelEnum) => {
    setSidePanel(param)
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    detail ? await editVoucher(data) : addVoucher(data)
  }

  return (
    <div className={styles.voucherDetailBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className={styles.voucherDetailInputText}>
            {t(localizationKey.voucherCode)}
          </p>
          <div>
            <Controller
              key={'code'}
              name={'code'}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register('code', { required: true })}
                  error={!!errors.code?.message}
                  helperText={errors.code?.message}
                  size='small'
                  sx={{ mr: 1 }}
                  placeholder='LOVEPIX10'
                />
              )}
            />
            <Button variant='contained'>
              {t(localizationKey.generateVoucherCode)}
            </Button>
          </div>
          <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
            {t(localizationKey.voucherCodeDesc)}
          </p>
          <Controller
            key={'description'}
            name={'description'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('description', { required: true })}
                error={!!errors.description?.message}
                helperText={errors.description?.message}
                size='small'
                multiline
                fullWidth
                rows={3}
                placeholder={t(localizationKey.voucherCodeDesc)}
              />
            )}
          />
        </div>
        <div>
          <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
            {t(localizationKey.voucherCodeData)}
          </p>
          <div className={styles.voucherDetailSidepanelRow}>
            <div style={{ backgroundColor: 'whitesmoke' }}>
              <div
                className={styles.voucherDetailListRow}
                onClick={() => changeSidePanel(SidePanelEnum.GENERAL)}
              >
                <SettingsIcon sx={{ mr: 1 }} />
                <p>{t(localizationKey.general)}</p>
              </div>
              <div
                className={styles.voucherDetailListRow}
                onClick={() => changeSidePanel(SidePanelEnum.STRICT)}
              >
                <HideSourceIcon sx={{ mr: 1 }} />
                <p>{t(localizationKey.strict)}</p>
              </div>
              <div
                className={styles.voucherDetailListRow}
                onClick={() => changeSidePanel(SidePanelEnum.LIMIT)}
              >
                <MultipleStopIcon sx={{ mr: 1 }} />
                <p>{t(localizationKey.limit)}</p>
              </div>
            </div>
            <div className={styles.voucherDetailSidepanelContent}>
              {detailLayout}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.voucherFooterRow}>
            <Button variant='outlined' onClick={fullReset}>
              Reset
            </Button>
            <Button type='submit' variant='contained' sx={{ ml: 1 }}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VoucherDetail
