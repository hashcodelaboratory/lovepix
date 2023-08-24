import Container from '@mui/material/Container'
import PreviewRow from './components/preview-row/preview-row'
import { GalleryItem } from '../../../../common/types/gallery'
import { Pages } from 'constants/pages/urls'
import PreviewCard from './components/preview-row/components/preview-card/preview-card'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import ItemSkeleton from 'screens-content/home/item-skeleton/item-skeleton'

type PreviewSectionProps = {
  galleryData?: GalleryItem[]
  loading?: boolean
}

const GallerySection = ({ galleryData, loading }: PreviewSectionProps): JSX.Element => {
  const { t } = useTranslation()
  const cards = galleryData?.map((item) => (
    <PreviewCard key={item.id} item={item} />
  ))

  const shimmers = [...Array(4)].map((index: number) => (
    <ItemSkeleton key={index} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow route={t(Pages.GALLERY)} title={t(localizationKey.gallery)}>
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {loading ? shimmers : cards}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default GallerySection
