import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import * as PagesUrls from '../../../../constants/pages/urls'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../messages/messages'

const SidebarFooter = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.sidebarFooter}>
      <Link href={PagesUrls.HOME}>
        <button className={styles.sidebarFooterButton}>
          {String(t(messages.home))}
        </button>
      </Link>
    </div>
  )
}

export default SidebarFooter
