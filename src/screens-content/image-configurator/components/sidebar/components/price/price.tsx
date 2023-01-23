import styles from "../../../../image-configurator-layout.module.scss";
import { getPrice } from "./utils/generator";
import { materials } from "../../../../../home/utils/configuration";
import { DIMENSIONS } from "../../../../../../common/configuration/dimensions/dimensions";
import { useLiveQuery } from "dexie-react-hooks";
import { configurationsTable } from "../../../../../../../database.config";
import { CONFIGURATION_TABLE_KEY } from "../../../../../../common/indexed-db/hooks/keys";

const Price = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  );

  const { width, height } = DIMENSIONS.find(
    (dim) => dim.id === configuration?.dimensionId
  ) ?? { width: 0, height: 0 };

  const price =
    width > 0 && height > 0
      ? getPrice(
          width,
          height,
          materials.find((material) => material.id === configuration?.material)
            ?.name
        )
      : "-";

  return (
    <div className={styles.containerPadding}>
      <div className={styles.price}>
        <h3>
          <b>Cena</b>
        </h3>
        <p className={styles.priceNoTax}>
          {price !== "-" && Number(price * 0.8).toFixed(2)} € bez DPH
        </p>
        <h3>
          <b>{Number(price).toFixed(2)} € </b>
        </h3>
      </div>
      <hr />
    </div>
  );
};

export default Price;
