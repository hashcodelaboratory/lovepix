import logo from '../../../../assets/logo_color.png'
import { ImageLayout } from '../../../../screens-content/home/enums/enums'
import styles from '../../../responsive-app-bar.module.scss'
import Image from 'next/image'
import * as React from 'react'

type Props = {
  navigate: () => void
}
const LogoComponent = ({ navigate }: Props) => {
  return (
    <Image
      src={logo}
      layout={ImageLayout.FIXED}
      width={50}
      height={50}
      alt=''
      onClick={navigate}
      className={styles.icon}
    />
  )
}

export default LogoComponent
