import styles from '../../../../image-configurator-layout.module.scss';
import {getPrice} from "./utils/generator";
import {useContext} from "react";
import AppContext from "../../../../../../app-context/app-context";
import {materials} from "../../../../../home/utils/configuration";
import {DIMENSIONS} from "../../../../../../common/configuration/dimensions/dimensions";

const Price = () => {
    const { state: { dimensionId, materialId } } = useContext(AppContext);

    const { width, height } = DIMENSIONS.find((dim) => dim.id === dimensionId) ?? { width: 0, height: 0 };

    const price = width > 0 && height > 0 ? getPrice(width, height, materials.find(material => material.id === materialId)?.name) : '-';

    return(
      <div className={styles.containerPadding}>
        <div className={styles.price}>
          <h3><b>Cena</b></h3>
          <p className={styles.priceNoTax}>{price !== '-' && Number(price * 0.8).toFixed(2)} € bez DPH</p>
          <h3><b>{Number(price).toFixed(2)} € </b></h3>
        </div>
        <hr />
      </div>
  )
}

export default Price