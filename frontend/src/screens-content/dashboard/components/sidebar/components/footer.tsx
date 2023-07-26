import styles from '../../../dashboard.module.scss'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../localization/localization-key'
import { Pages } from '../../../../../constants/pages/urls'

const SidebarFooter = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.sidebarFooter}>
      <Link href={Pages.HOME}>
        <button className={styles.sidebarFooterButton}>
          {String(t(localizationKey.home))}
        </button>
      </Link>
    </div>
  )
}

export default SidebarFooter
