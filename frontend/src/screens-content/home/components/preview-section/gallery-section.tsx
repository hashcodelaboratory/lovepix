import Container from '@mui/material/Container'
import PreviewRow from './components/preview-row/preview-row'
import { GalleryItem } from '../../../../common/types/gallery'
import { Pages } from 'constants/pages/urls'
import PreviewCard from './components/preview-row/components/preview-card/preview-card'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import Shimmer from '../../../../common/components/shimmer/shimmer'

type PreviewSectionProps = {
  galleryData?: GalleryItem[]
  loading?: boolean
}

const GallerySection = ({
  galleryData,
  loading,
}: PreviewSectionProps): JSX.Element => {
  const { t } = useTranslation()
  const cards = galleryData?.map((item) => (
    <PreviewCard key={item.id} item={item} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow route={t(Pages.GALLERY)} title={t(localizationKey.gallery)}>
        <Shimmer isLoading={loading}>{cards}</Shimmer>
      </PreviewRow>
    </Container>
  )
}

export default GallerySection