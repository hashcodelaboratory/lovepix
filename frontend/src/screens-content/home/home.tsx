import { Configuration } from '../../common/types/configuration'
import { GalleryItem } from '../../common/types/gallery'
import Carousel from './components/carousel/carousel'
import PreviewSection from './components/preview-section/preview-section'
import SliderComponent from './components/slider/slider'
import Newsletter from './components/newsletter/newsletter'
import ReviewsSection from './components/reviews-section/reviews-section'

type HomeLayoutProps = {
  configuration: Configuration
  galleryData?: GalleryItem[]
}

const HomeLayout = ({ galleryData }: HomeLayoutProps) => (
  <div>
    <Carousel />
    <ReviewsSection />
    <PreviewSection galleryData={galleryData} />
    <SliderComponent data={galleryData} />
    <Newsletter />
  </div>
)

export default HomeLayout
