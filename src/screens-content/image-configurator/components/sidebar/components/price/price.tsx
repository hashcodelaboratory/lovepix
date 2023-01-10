import styles from '../../../../image-configurator-layout.module.scss';
import {getPrice} from "./utils/generator";
import {useContext} from "react";
import AppContext from "../../../../../../app-context/app-context";
import {
    dimensionsByHeight,
    dimensionsBySquare,
    dimensionsByWidth,
    materials
} from "../../../../../home/utils/configuration";

const Price = () => {
    const { state: { dimensionId, materialId } } = useContext(AppContext);

    const dimensions = [
        ...dimensionsByWidth,
        ...dimensionsByHeight,
        ...dimensionsBySquare,
    ];

    const { width, height } = dimensions.find((dim) => dim.id === dimensionId) ?? { width: 0, height: 0 };

    const price = width > 0 && height > 0 ? getPrice(width, height, materials.find(material => material.id === materialId)?.name) : '-';

    return(
      <div className={styles.containerPadding}>
        <div className={styles.price}>
          <h3><b>Cena</b></h3>
          <p className={styles.priceNoTax}>{price !== '-' && price * 0.8} € bez DPH</p>
          <h3><b>{price} € </b></h3>
        </div>
        <hr />
      </div>
  )
}

export default Price