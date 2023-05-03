import styles from "../../home.module.scss";
import Slider from "react-slick";

const SliderComponent = (): JSX.Element => {
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
          }
        },
        {
          breakpoint: 2500,
          settings: {
            centerPadding: "25%",
          }
        },
        {
          breakpoint: 1920,
          settings: {
            centerPadding: "20%",
          },
        }]}
    >
      <div>
        <div className={styles.sliderImage} />
      </div>
      <div>
        <div className={styles.sliderImage} />
      </div>
      <div>
        <div className={styles.sliderImage} />
      </div>
      <div>
        <div className={styles.sliderImage} />
      </div>
      <div>
        <div className={styles.sliderImage} />
      </div>
    </Slider>
  );
};

export default SliderComponent;