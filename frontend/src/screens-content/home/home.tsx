import { Configuration } from '../../common/types/configuration'
import { GalleryItem } from '../../common/types/gallery'
import Carousel from './components/carousel/carousel'
import SliderComponent from './components/slider/slider'
import Newsletter from './components/newsletter/newsletter'
import ReviewsSection from './components/reviews-section/reviews-section'
import ProductsSection from './components/products-section/products-section'
import GallerySection from './components/preview-section/gallery-section'

type HomeLayoutProps = {
  configuration: Configuration
  galleryData?: GalleryItem[]
  loading: boolean
}

const HomeLayout = ({
  galleryData,
  configuration,
  loading,
}: HomeLayoutProps) => (
  <div>
    <Carousel configuration={configuration} />
    <GallerySection
      configuration={configuration}
      galleryData={galleryData}
      loading={loading}
    />
    <ProductsSection />
    <ReviewsSection />
    <SliderComponent data={galleryData} />
    <Newsletter />
  </div>
)

export default HomeLayout
