import styles from '../../dashboard.module.scss'
import { SIDEBAR_MENU_LIST } from './utils/menu'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const SidebarContent = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const goTo = (link: string) => router.push(link)

  return (
    <div className={styles.sidebarContent}>
      {SIDEBAR_MENU_LIST.map(({ title, link }) => (
        <p
          key={uuidv4()}
          className={styles.sidebarContentTitle}
          onClick={() => goTo(link)}
        >
          {String(t(title))}
        </p>
      ))}
    </div>
  )
}

export default SidebarContent
