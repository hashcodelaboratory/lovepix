import Container from '@mui/material/Container'
import PreviewRow from './components/preview-row/preview-row'
import { GalleryItem } from '../../../../common/types/gallery'
import { Pages } from 'constants/pages/urls'
import PreviewCard from './components/preview-row/components/preview-card/preview-card'
import { localizationKey } from 'localization/localization-key'

type PreviewSectionProps = {
  galleryData?: GalleryItem[]
}

const GallerySection = ({ galleryData }: PreviewSectionProps): JSX.Element => {
  const cards = galleryData?.map((item) => (
    <PreviewCard key={item.id} item={item} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow route={Pages.GALLERY} title={localizationKey.gallery}>
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {cards}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default GallerySection
