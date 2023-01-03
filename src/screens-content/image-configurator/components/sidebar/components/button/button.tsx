import styles from "../../../../image-configurator-layout.module.scss";
import { ShoppingCart } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useUpdateOrder } from "../../../../../home/api/order/useUpdateOrder";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import {
  materials,
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";
import { useRouter } from "next/router";
import { SHOPPING_CART } from "constants/pages/urls";
import ImageConfiguratorContext from "../../../../image-configurator-context/image-configurator-context";
import {INITIAL_IMAGE} from "../../../../../../app-context/consts";

const Button = () => {
  const { t } = useTranslation();

  const { mutate: updateOrder } = useUpdateOrder();

  const router = useRouter();

  const {
    state: { dimensionId, materialId, image, shoppingCart },
    stateAction: { setImage }
  } = useContext(AppContext);

  const { state: { image: cropped }, stateAction: { setImage: setCropped } } = useContext(ImageConfiguratorContext);

  const handleUpdateOrder = () => {
    const dimensions = [
      ...dimensionsByWidth,
      ...dimensionsByHeight,
      ...dimensionsBySquare,
    ];

    const dim = dimensions.find((dim) => dim.id === dimensionId);

    const payload = {
      shoppingCart: {
        images: [...shoppingCart?.images ?? [], {
          name: image?.name ?? '',
          url: cropped ?? '',
          qty: 1,
          origin: image?.url ?? '',
          width: dim?.width ?? 0,
          height: dim?.height ?? 0,
          material: materials.find((mat) => mat.id === materialId)?.name ?? '',
        }]
      },
      image: null
    };

    updateOrder(payload);

    setCropped(undefined);
    setImage(INITIAL_IMAGE);

    router.push(`${SHOPPING_CART}`);
  };

  return (
    <div className={styles.containerPadding}>
      <button className={styles.button} onClick={handleUpdateOrder}>
        <ShoppingCart />
        <p className={styles.buttonTitle}>{String(t(messages.toCart))}</p>
      </button>
    </div>
  );
};

export default Button;
