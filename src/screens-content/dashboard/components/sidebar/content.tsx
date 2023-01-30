import styles from '../../dashboard.module.scss'
import { SIDEBAR_MENU_LIST } from './utils/menu'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'

const SidebarContent = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.sidebarContent}>
      {SIDEBAR_MENU_LIST.map(({ title }) => (
        <p key={uuidv4()} className={styles.sidebarContentTitle}>
          {String(t(title))}
        </p>
      ))}
    </div>
  )
}

export default SidebarContent
