import Container from '@mui/material/Container'
import GalleryRow from './components/gallery-row/gallery-row'
import { GalleryItem } from '../../../../common/types/gallery'
import { Pages } from 'constants/pages/urls'
import GalleryCard from './components/gallery-row/components/gallery-card/gallery-card'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import { Configuration } from 'common/types/configuration'
import Shimmer from '../../../../common/components/shimmer/shimmer'

type PreviewSectionProps = {
  configuration: Configuration
  galleryData?: GalleryItem[]
  loading?: boolean
}

const GallerySection = ({
  configuration,
  galleryData,
  loading,
}: PreviewSectionProps): JSX.Element => {
  const { t } = useTranslation()
  const cards = galleryData?.map((item) => (
    <GalleryCard configuration={configuration} key={item.id} item={item} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <GalleryRow route={t(Pages.GALLERY)} title={t(localizationKey.gallery)}>
        <Shimmer isLoading={loading}>{cards}</Shimmer>
      </GalleryRow>
    </Container>
  )
}

export default GallerySection
