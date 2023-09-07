import styles from '../../../../home.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { GalleryItem } from '../../../../../../common/types/gallery'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../../../localization/localization-key'
import { useRouter } from 'next/router'

type PreviewRowProps = {
  galleryData?: GalleryItem[]
  title: string
  route: string
  children: React.ReactNode
}

const PreviewRow = ({
  title,
  children,
  route,
}: PreviewRowProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const redirect = async () => {
    await router.push(t(route))
  }

  const content = (
    <div>
      <div className={styles.previewTitleRow}>
        <h3>{t(title)}</h3>
        <button className={styles.previewTitleRowButton} onClick={redirect}>
          <p className={styles.previewTitleRowButtonText}>
            {t(localizationKey.showMore)}
          </p>
          <ArrowForwardIcon sx={{ width: 16 }} />
        </button>
      </div>
      <hr />
      <div className={styles.previewImageRow}>{children}</div>
    </div>
  )

  return content
}

export default PreviewRow
