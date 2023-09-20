import styles from '../../../dashboard.module.scss'
import { SIDEBAR_MENU_LIST } from '../utils/menu'
import { useTranslation } from 'next-i18next'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const SidebarContent = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const goTo = (link: string) => router.push(link)

  return (
    <div className={styles.sidebarContent}>
      {SIDEBAR_MENU_LIST.map(({ title, link, count }) => (
        <div className={styles.sidebarRow} key={uuidv4()}>
          <p className={styles.sidebarRowTitle} onClick={() => goTo(link)}>
            {String(t(title))}
          </p>
          {count && <p className={styles.sidebarRowSubtitle}>{`(${count})`}</p>}
        </div>
      ))}
    </div>
  )
}

export default SidebarContent
