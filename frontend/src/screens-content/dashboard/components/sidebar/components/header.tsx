import styles from '../../../dashboard.module.scss'
import logo from '../../../../../assets/logo_color.png'
import { ImageLayout } from '../../../../home/enums/enums'
import Image from 'next/image'
import * as React from 'react'

const SidebarHeader = () => {
  return (
    <div className={styles.sidebarHeader}>
      <Image
        src={logo}
        layout={ImageLayout.FIXED}
        width={40}
        height={40}
        alt=''
        className={styles.icon}
      />
      <div className={styles.sidebarHeaderColumn}>
        <h2 className={styles.sidebarHeaderTitle}>Admin</h2>
        <p className={styles.sidebarHeaderSubtitle}>Lovepix</p>
      </div>
    </div>
  )
}

export default SidebarHeader
