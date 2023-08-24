import Container from '@mui/material/Container'
import PreviewRow from './components/preview-row/preview-row'
import { GalleryItem } from '../../../../common/types/gallery'
import { Pages } from 'constants/pages/urls'
import PreviewCard from './components/preview-row/components/preview-card/preview-card'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import { Configuration } from 'common/types/configuration'

type PreviewSectionProps = {
  configuration: Configuration
  galleryData?: GalleryItem[]
}

const GallerySection = ({
  configuration,
  galleryData,
}: PreviewSectionProps): JSX.Element => {
  const { t } = useTranslation()
  const cards = galleryData?.map((item) => (
    <PreviewCard configuration={configuration} key={item.id} item={item} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow route={t(Pages.GALLERY)} title={t(localizationKey.gallery)}>
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {cards}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default GallerySection
