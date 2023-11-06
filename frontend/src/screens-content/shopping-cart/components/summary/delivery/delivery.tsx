import styles from '../../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../localization/localization-key'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Delivery as DeliveryOptions } from '../../../../../common/enums/delivery'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { FormInputs } from '../../../../../common/types/form'
import { useMemo } from 'react'

type DeliverySectionProps = {
  message?: string
  control: Control<FormInputs>
  freeDelivery?: boolean
  setValue: UseFormSetValue<FormInputs>
}

const Delivery = ({
  control,
  message,
  freeDelivery,
  setValue,
}: DeliverySectionProps) => {
  const { t } = useTranslation()

  const isFreeDeliveryAvailable = useMemo(() => {
    if (freeDelivery) {
      setValue('delivery', DeliveryOptions.FREE_DELIVERY)
      return true
    } else {
      setValue('delivery', undefined)
      return false
    }
  }, [freeDelivery])

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>
          {String(t(localizationKey.delivery))}
        </h3>
      </div>
      <Controller
        name='delivery'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl fullWidth error={!!message}>
            <RadioGroup
              {...field}
              onChange={field.onChange}
              value={field.value}
            >
              {!isFreeDeliveryAvailable && (
                <FormControlLabel
                  value={DeliveryOptions.COURIER}
                  control={<Radio />}
                  label={
                    <div className={styles.radioGroupLabel}>
                      <p className={styles.priceBox}>5.00 €</p>
                      <div className={styles.deliveryLightText}>
                        {String(t(localizationKey.courier))}
                      </div>
                    </div>
                  }
                  className={styles.deliveryField}
                />
              )}
              {!isFreeDeliveryAvailable && (
                <FormControlLabel
                  value={DeliveryOptions.PERSONAL_COLLECT}
                  control={<Radio />}
                  label={
                    <div className={styles.radioGroupLabel}>
                      <p className={styles.priceBox}>
                        {String(t(localizationKey.free))}
                      </p>
                      <div className={styles.deliveryLightText}>
                        {String(t(localizationKey.personalCollect))}
                      </div>
                    </div>
                  }
                  className={styles.deliveryField}
                />
              )}
              {isFreeDeliveryAvailable && (
                <FormControlLabel
                  value={DeliveryOptions.FREE_DELIVERY}
                  control={<Radio checked />}
                  label={
                    <div className={styles.radioGroupLabel}>
                      <p className={styles.priceBox}>
                        {String(t(localizationKey.free))}
                      </p>
                      <div className={styles.deliveryLightText}>
                        {'Máte nárok na dopravu zdarma'}
                      </div>
                    </div>
                  }
                  className={styles.deliveryField}
                />
              )}
            </RadioGroup>
            {message && (
              <FormHelperText error>{String(t(message))}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </div>
  )
}

export default Delivery
