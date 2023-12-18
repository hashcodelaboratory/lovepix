import { Container, Button } from '@mui/material'
import styles from './profile.module.scss'
import { useState } from 'react'
import Info from './info/info'
import Address from './address/address'

enum ActiveLayout {
  INFO = 'INFO',
  ADDRESS = 'ADDRESS',
}

const ProfileLayout = () => {
  const [activeLayout, setActiveLayout] = useState<ActiveLayout>(
    ActiveLayout.INFO
  )

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
        return <Address />
    }
  }

  return (
    <Container className={styles.container}>
      <h2>Môj profil</h2>
      <div className={styles.rowMenu}>
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
