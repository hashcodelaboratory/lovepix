import styles from "../../home.module.scss";
import Slider from "react-slick";

const SliderComponent = (): JSX.Element => {
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    speed: 2000,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    autoplay: true,
    pauseOnHover: true,
    nextArrow: <></>,
    prevArrow: <></>
  };

  return (
    <Slider {...settings} className={styles.slider}>
      <div >
        <h3 className={styles.sliderImage}>1</h3>
      </div>
      <div >
        <h3 className={styles.sliderImage}>2</h3>
      </div>
      <div >
        <h3 className={styles.sliderImage}>3</h3>
      </div>
      <div >
        <h3 className={styles.sliderImage}>4</h3>
      </div>
      <div >
        <h3 className={styles.sliderImage}>5</h3>
      </div>
    </Slider>
  );
};

export default SliderComponent;