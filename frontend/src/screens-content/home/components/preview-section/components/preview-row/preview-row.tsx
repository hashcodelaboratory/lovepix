import styles from '../../../../home.module.scss'
import PreviewCard from './components/preview-card/preview-card'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { GalleryItem } from '../../../../../../common/types/gallery'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../../../localization/localization-key'
import { useRouter } from 'next/router'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { configurationsTable } from '../../../../../../../database.config'
import { useLiveQuery } from 'dexie-react-hooks'

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
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  )

  const dummy = (
    <>
      <PreviewCard configuration={configuration} />
      <PreviewCard configuration={configuration} />
      <PreviewCard configuration={configuration} />
    </>
  )

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
      <div className={styles.previewImageRow}>{children ?? dummy}</div>
    </div>
  )

  return content
}

export default PreviewRow
