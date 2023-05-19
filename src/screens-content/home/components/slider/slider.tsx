import styles from "../../home.module.scss";
import Slider from "react-slick";
import { GalleryItem } from "../../../../common/types/gallery";

type SliderComponentProps = {
  data?: GalleryItem[];
}

const SliderComponent = ({ data }: SliderComponentProps): JSX.Element => {
  return (
    <Slider
      dots={true}
      slidesToShow={1}
      speed={2000}
      autoplaySpeed={5000}
      swipeToSlide={true}
      autoplay={false}
      pauseOnHover={true}
      arrows={false}
      focusOnSelect={true}
      className={styles.slider}
      centerMode={true}
      responsive={[
        {
          breakpoint: 3000,
          settings: {
            centerPadding: "30%",
          },
        },
        {
          breakpoint: 2500,
          settings: {
            centerPadding: "25%",
          },
        },
        {
          breakpoint: 1920,
          settings: {
            centerPadding: "20%",
          },
        }]}
    >
      {
        data?.map((item) => (
          <div key={item.id}>
            <div
              className={styles.sliderImage}
              style={{ backgroundImage: `url("${item?.url}")`, filter: "none" }}
            />
          </div>
        )) ??
        <div>
          <div className={styles.sliderImage} />
        </div>
      }
    </Slider>
  );
};

export default SliderComponent;