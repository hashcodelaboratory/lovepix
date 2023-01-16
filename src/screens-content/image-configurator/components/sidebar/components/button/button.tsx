import styles from "../../../../image-configurator-layout.module.scss";
import { ShoppingCart } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useContext } from "react";
import {materials} from "screens-content/home/utils/configuration";
import { useRouter } from "next/router";
import { SHOPPING_CART } from "constants/pages/urls";
import ImageConfiguratorContext from "../../../../image-configurator-context/image-configurator-context";
import {getPrice} from "../price/utils/generator";
import {DIMENSIONS} from "../../../../../../common/configuration/dimensions/dimensions";
import {useLiveQuery} from "dexie-react-hooks";
import {configurationsTable} from "../../../../../../../database.config";

const Button = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const data = useLiveQuery(
      () => configurationsTable.get('conf'),
      []
  );

  const handleUpdateOrder = async () => {

    // const dim = DIMENSIONS.find((dim) => dim.id === dimensionId) ?? { width: 0, height: 0 };
    //
    //   const price = dim.width > 0 && dim.height > 0 ? getPrice(dim.width, dim.height, materials.find(material => material.id === materialId)?.name) : 0;
    //
    //   let totalPrice: number = 0;
    //   shoppingCart?.images?.forEach((image) => {
    //     totalPrice += image.price * image.qty;
    //   });
    //   totalPrice += Number(Number(price).toFixed(2));
    //
    //   const payload = {
    //     image: null,
    //     shoppingCart: {
    //       images: [...shoppingCart?.images ?? [], {
    //         name: image?.name ?? '',
    //         url: url ?? '',
    //         qty: 1,
    //         origin: image?.url ?? '',
    //         width: dim.width ?? 0,
    //         height: dim.height ?? 0,
    //         material: materials.find((mat) => mat.id === materialId)?.name ?? '',
    //         price: Number(Number(price).toFixed(2))
    //       }]
    //     },
    //     totalPrice: totalPrice,
    //   };

      router.push(`${SHOPPING_CART}`);
  };

  return (
    <div className={styles.containerPadding}>
      <button className={styles.button} onClick={handleUpdateOrder} disabled={!data?.image}>
        <ShoppingCart />
        <p className={styles.buttonTitle}>{String(t(messages.toCart))}</p>
      </button>
    </div>
  );
};

export default Button;
