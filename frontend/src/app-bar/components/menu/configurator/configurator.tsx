import Link from 'next/link'
import * as PagesUrls from '../../../../constants/pages/urls'
import * as PagesTitles from '../../../../constants/pages/titles'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@mui/material'
import styles from '../../../responsive-app-bar.module.scss'

type Props = {
  close: () => void
  origin?: string
}
const ConfiguratorComponent = ({ close, origin }: Props) => {
  const { t } = useTranslation()

  return (
    <Link onClick={close} href={PagesUrls.CONFIGURATOR}>
      <Badge badgeContent={origin ? '!' : 0} color='warning'>
        <p className={styles.link} style={{ margin: 0 }}>
          {String(t(PagesTitles.CONFIGURATOR))}
        </p>
      </Badge>
    </Link>
  )
}

export default ConfiguratorComponent
