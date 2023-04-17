import { orderTable } from "../../../../../../../../database.config";
import { ORDER_TABLE_KEY } from "../../../../../../../common/indexed-db/hooks/keys";
import { Image, Order } from "../../../../../../../common/types/order";

export enum UpdateQuantityWay {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE"
}

export const removeImage = (url?: string, images?: Image[]) => {
  const filtered = images?.filter(
    (image: Image) => image.url !== url,
  );

  const total = filtered?.reduce(
    (accumulator, { qty, price }) => accumulator + qty * price,
    0
  );

  if (images?.length === 1) {
    orderTable.clear();
  } else {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: {
        images: filtered,
      },
      totalPrice: total?.toFixed(2),
    });
  }
};

export const updateQuantity = async (way: UpdateQuantityWay, order: Order, image: Image) => {
  if (way === UpdateQuantityWay.DECREASE && image.qty === 1) return;

  const { images } = order?.shoppingCart;
  const filtered = images.filter((_image) => image.url !== _image.url);
  const quantity = way === UpdateQuantityWay.INCREASE ? image.qty + 1 : image.qty - 1;
  filtered.push({ ...image, qty: quantity });

  let totalPrice = 0;
  filtered.forEach(({ price }) => {
    totalPrice += quantity * price;
  });

  await orderTable.update(ORDER_TABLE_KEY, {
    shoppingCart: {
      images: filtered,
    },
    totalPrice: totalPrice.toFixed(2),
  });
};