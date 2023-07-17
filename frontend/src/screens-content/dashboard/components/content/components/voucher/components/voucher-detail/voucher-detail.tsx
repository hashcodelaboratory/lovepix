import styles from '../../../../../../dashboard.module.scss'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import HideSourceIcon from '@mui/icons-material/HideSource'
import MultipleStopIcon from '@mui/icons-material/MultipleStop'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { messages } from '../../../../../../../../messages/messages'
import General from './components/general/general'
import Strict from './components/strict/strict'
import Limit from './components/limit/limit'

enum SidePanelEnum {
  GENERAL = 'GENERAL',
  STRICT = 'STRICT',
  LIMIT = 'LIMIT',
}

const VoucherDetail = () => {
  const { t } = useTranslation()

  const [sidePanel, setSidePanel] = useState<SidePanelEnum>(
    SidePanelEnum.GENERAL
  )

  const detailLayout = useMemo(() => {
    switch (sidePanel) {
      case SidePanelEnum.GENERAL:
        return <General />
      case SidePanelEnum.STRICT:
        return <Strict />
      case SidePanelEnum.LIMIT:
        return <Limit />
    }
  }, [sidePanel])

  const changeSidePanel = (param: SidePanelEnum) => {
    setSidePanel(param)
  }

  return (
    <div className={styles.voucherDetailBox}>
      <div>
        <p className={styles.voucherDetailInputText}>
          {t(messages.voucherCode)}
        </p>
        <div>
          <TextField size='small' sx={{ mr: 1 }} placeholder='LOVEPIX10' />
          <Button variant='contained'>{t(messages.generateVoucherCode)}</Button>
        </div>
        <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
          {t(messages.voucherCodeDesc)}
        </p>
        <TextField
          size='small'
          multiline
          fullWidth
          rows={3}
          placeholder={t(messages.voucherCodeDesc)}
        />
      </div>
      <div>
        <p className={styles.voucherDetailInputText} style={{ marginTop: 8 }}>
          {t(messages.voucherCodeData)}
        </p>
        <div className={styles.voucherDetailSidepanelRow}>
          <div style={{ backgroundColor: 'whitesmoke' }}>
            <div
              className={styles.voucherDetailListRow}
              onClick={() => changeSidePanel(SidePanelEnum.GENERAL)}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              <p>{t(messages.general)}</p>
            </div>
            <div
              className={styles.voucherDetailListRow}
              onClick={() => changeSidePanel(SidePanelEnum.STRICT)}
            >
              <HideSourceIcon sx={{ mr: 1 }} />
              <p>{t(messages.strict)}</p>
            </div>
            <div
              className={styles.voucherDetailListRow}
              onClick={() => changeSidePanel(SidePanelEnum.LIMIT)}
            >
              <MultipleStopIcon sx={{ mr: 1 }} />
              <p>{t(messages.limit)}</p>
            </div>
          </div>
          <div className={styles.voucherDetailSidepanelContent}>
            {detailLayout}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoucherDetail
