import styles from "../../../../image-configurator-layout.module.scss";
import { ShoppingCart } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useUpdateOrder } from "../../../../../home/api/order/useUpdateOrder";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import {materials} from "screens-content/home/utils/configuration";
import { useRouter } from "next/router";
import { SHOPPING_CART } from "constants/pages/urls";
import ImageConfiguratorContext from "../../../../image-configurator-context/image-configurator-context";
import {INITIAL_IMAGE} from "../../../../../../app-context/consts";
import {UPLOAD_IMAGES} from "../../../../../home/components/upload-image/dropzone/utils";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from "../../../../../../../utils/firebase/config";
import {useOrder} from "../../../../../home/api/order/useOrder";
import {useQueryClient} from "react-query";
import {ORDER_KEY} from "../../../../../home/api/order/utils/keys";
import {getPrice} from "../price/utils/generator";
import {DIMENSIONS} from "../../../../../../common/configuration/dimensions/dimensions";

const Button = () => {
  const { t } = useTranslation();

  const { mutate: updateOrder } = useUpdateOrder();

  const { data: order } = useOrder();

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    state: { dimensionId, materialId, image, shoppingCart },
    stateAction: { setImage }
  } = useContext(AppContext);

  const { state: { image: cropped }, stateAction: { setImage: setCropped } } = useContext(ImageConfiguratorContext);

  const handleUpdateOrder = async () => {

    const dim = DIMENSIONS.find((dim) => dim.id === dimensionId) ?? { width: 0, height: 0 };

    // UPLOADING TO STORAGE
    const res = await fetch(cropped ?? '');
    const file = await res.blob();

    const uploadURL = `${UPLOAD_IMAGES}/${order?.id}/EDITED-${Date.now()}`;

    const storageRef = ref(storage, uploadURL);

    const {
      metadata: { name },
    } = await uploadBytes(storageRef, file);
    if (name) {
      const url = await getDownloadURL(
          ref(storage, `${UPLOAD_IMAGES}/${order?.id}/${name}`)
      );

      const price = dim.width > 0 && dim.height > 0 ? getPrice(dim.width, dim.height, materials.find(material => material.id === materialId)?.name) : 0;

      let totalPrice: number = 0;
      shoppingCart?.images?.forEach((image) => {
        totalPrice += image.price * image.qty;
      });
      totalPrice += Number(Number(price).toFixed(2));

      const payload = {
        image: null,
        shoppingCart: {
          images: [...shoppingCart?.images ?? [], {
            name: image?.name ?? '',
            url: url ?? '',
            qty: 1,
            origin: image?.url ?? '',
            width: dim.width ?? 0,
            height: dim.height ?? 0,
            material: materials.find((mat) => mat.id === materialId)?.name ?? '',
            price: Number(Number(price).toFixed(2))
          }]
        },
        totalPrice: totalPrice,
      };

      updateOrder(payload);

      setCropped(undefined);
      setImage(INITIAL_IMAGE);

      await queryClient.invalidateQueries(ORDER_KEY);
      router.push(`${SHOPPING_CART}`);
    }
  };

  console.log(cropped)

  return (
    <div className={styles.containerPadding}>
      <button className={styles.button} onClick={handleUpdateOrder} disabled={!cropped}>
        <ShoppingCart />
        <p className={styles.buttonTitle}>{String(t(messages.toCart))}</p>
      </button>
    </div>
  );
};

export default Button;
