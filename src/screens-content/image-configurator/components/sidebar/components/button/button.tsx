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
import { ImageStatus } from "app-context/enums";
import { SHOPPING_CART } from "constants/pages/urls";

const Button = () => {
  const { t } = useTranslation();

  const { mutate: updateOrder } = useUpdateOrder();

  const router = useRouter();

  const {
    state: { dimensionId, materialId },
  } = useContext(AppContext);

  const handleUpdateOrder = () => {
    const dimensions = [
      ...dimensionsByWidth,
      ...dimensionsByHeight,
      ...dimensionsBySquare,
    ];

    const dim = dimensions.find((dim) => dim.id === dimensionId);

    const payload = {
      width: dim?.width,
      height: dim?.height,
      material: materials.find((mat) => mat.id === materialId)?.name,
      status: ImageStatus.CONFIGURED,
    };

    updateOrder(payload);

    router.push(`/en/${SHOPPING_CART}`);
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
