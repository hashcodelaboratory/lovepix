import styles from "../../../../image-configurator-layout.module.scss";
import { ShoppingCart } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useRouter } from "next/router";
import { SHOPPING_CART } from "constants/pages/urls";
import {useLiveQuery} from "dexie-react-hooks";
import {configurationsTable, orderTable} from "../../../../../../../database.config";
import {DIMENSIONS} from "../../../../../../common/configuration/dimensions/dimensions";
import {getPrice} from "../price/utils/generator";
import {materials} from "../../../../../home/utils/configuration";

const Button = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const configuration = useLiveQuery(
      () => configurationsTable.get('conf'),
      []
  );

    const order = useLiveQuery(
        () => orderTable.get('order'),
        []
    );

  const handleUpdateOrder = async () => {
      const dim = DIMENSIONS.find((dim) => dim.id === configuration?.dimensionId) ?? { width: 0, height: 0 };

      const material = materials.find(material => material.id === configuration?.material)?.name;

      const price = dim.width > 0 && dim.height > 0 ? getPrice(dim.width, dim.height, material) : 0;

      let totalPrice: number = 0;
      order?.shoppingCart?.images?.forEach((image: any) => {
        totalPrice += image.price * image.qty;
      });
      totalPrice += Number(price);

      const payload = {
        shoppingCart: {
          images: [...order?.shoppingCart?.images ?? [], {
            url: configuration?.image,
            qty: 1,
            origin: configuration?.origin,
            width: dim.width,
            height: dim.height,
            material,
            price: Number(Number(price).toFixed(2))
          }]
        },
        totalPrice: totalPrice.toFixed(2),
      };

      order?.shoppingCart ? orderTable.update('order', payload) : orderTable.add(payload, 'order');

      configurationsTable.clear();

      await router.push(`${SHOPPING_CART}`);
  };

  return (
    <div className={styles.containerPadding}>
      <button className={styles.button} onClick={handleUpdateOrder} disabled={!configuration?.image}>
        <ShoppingCart />
        <p className={styles.buttonTitle}>{String(t(messages.toCart))}</p>
      </button>
    </div>
  );
};

export default Button;
