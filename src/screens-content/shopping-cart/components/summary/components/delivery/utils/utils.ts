import { orderTable } from "../../../../../../../../database.config";
import { ORDER_TABLE_KEY } from "../../../../../../../common/indexed-db/hooks/keys";
import { Image } from "../../../../../../../common/types/order";

export const removeImage = async (url?: string, images?: Image[]) => {
  if (images?.length === 1) {
    orderTable.clear();
  } else {
    orderTable.update(ORDER_TABLE_KEY, {
      shoppingCart: {
        images: images?.filter(
          (image: Image) => image.url !== url,
        ),
      },
    });
  }
};