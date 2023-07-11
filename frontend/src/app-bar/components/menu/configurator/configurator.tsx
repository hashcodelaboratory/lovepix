import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import * as PagesUrls from '../../../../constants/pages/urls'
import * as PagesTitles from '../../../../constants/pages/titles'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@mui/material'
import Button from '@mui/material/Button'

type Props = {
  close: () => void
  origin?: string
}
const ConfiguratorComponent = ({ close, origin }: Props) => {
  const { t } = useTranslation()

  return (
    <Button
      key={uuidv4()}
      onClick={close}
      sx={{
        my: 2,
        mx: 1,
        color: 'black',
        display: 'block',
        fontFamily: 'monospace',
      }}
    >
      <Link href={PagesUrls.CONFIGURATOR}>
        <Badge badgeContent={origin ? '!' : 0} color='warning'>
          {String(t(PagesTitles.CONFIGURATOR))}
        </Badge>
      </Link>
    </Button>
  )
}

export default ConfiguratorComponent
