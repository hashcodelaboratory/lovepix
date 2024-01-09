import { Container, Button } from '@mui/material'
import styles from './profile.module.scss'
import { useState } from 'react'
import Info from './info/info'
import Address from './address/address'
import Orders from './orders/orders'
import useLoggedUser from '../../common/api/use-logged-user'
import { useOrders } from '../../common/api/use-orders'
import { OrderState as OrderStateEnum } from '../../common/enums/order-states'
import { localizationKey } from '../../localization/localization-key'
import { useTranslation } from 'next-i18next'

enum ActiveLayout {
  INFO = 'INFO',
  ADDRESS = 'ADDRESS',
  ORDERS = 'ORDERS',
}

const ProfileLayout = () => {
  const { t } = useTranslation()

  const { user } = useLoggedUser()
  const { data: orders } = useOrders(user?.email, {
    enabled: !!user?.email,
  })

  const [activeLayout, setActiveLayout] = useState<ActiveLayout>(
    ActiveLayout.ORDERS
  )

  const states = {
    [OrderStateEnum.CREATED]: t(localizationKey.orderCreated),
    [OrderStateEnum.DELIVERED]: t(localizationKey.accepted),
    [OrderStateEnum.PACKED]: t(localizationKey.packed),
    [OrderStateEnum.PICKED]: t(localizationKey.shipped),
    [OrderStateEnum.SHIPPED]: t(localizationKey.finished),
  }

  const orderData =
    orders?.map(({ id, date, totalPrice, orderState }) => ({
      id: id,
      date: new Date(date).toLocaleDateString() ?? '',
      totalPrice: totalPrice,
      state: orderState
        ? states[orderState[orderState.length - 1].state as OrderStateEnum]
        : '-',
    })) ?? []

  const addressData =
    orders
      ?.map(({ form }) => ({
        form: form,
      }))
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.form.address === value.form.address &&
              t.form.city === value.form.city
          )
      ) ?? []

  const changeLayout = (param: ActiveLayout) => {
    setActiveLayout(param)
  }

  const getButtonStyle = (param: ActiveLayout) => {
    return styles[
      activeLayout === param ? 'buttonMenuActive' : 'buttonMenuNotActive'
    ]
  }

  const getContentComponent = () => {
    switch (activeLayout) {
      case ActiveLayout.INFO:
        return <Info />
      case ActiveLayout.ADDRESS:
        return <Address data={Array.from(new Set(addressData))} />
      case ActiveLayout.ORDERS:
        return <Orders data={orderData} />
    }
  }

  return (
    <Container className={styles.container}>
      <h2>Môj profil</h2>
      <div className={styles.rowMenu}>
        <Button
          className={getButtonStyle(ActiveLayout.ORDERS)}
          onClick={() => changeLayout(ActiveLayout.ORDERS)}
        >
          Objednávky
        </Button>
        <Button
          className={getButtonStyle(ActiveLayout.INFO)}
          onClick={() => changeLayout(ActiveLayout.INFO)}
        >
          Základné informácie
        </Button>
        <Button
          className={getButtonStyle(ActiveLayout.ADDRESS)}
          onClick={() => changeLayout(ActiveLayout.ADDRESS)}
        >
          Doručovacie adresy
        </Button>
      </div>
      <div className={styles.contentContainer}>{getContentComponent()}</div>
    </Container>
  )
}

export default ProfileLayout
