import AppContext, {AppContextProps, ShoppingCart, UploadedImage} from "./app-context";
import { useEffect, useState } from "react";
import { ContextProviderProps } from "./types";
import { useOrder } from "../screens-content/home/api/order/useOrder";
import { ImageStatus } from "./enums";
import { INITIAL_IMAGE } from "./consts";
import {FormInputs} from "../common/types/form";
import {Summary} from "../common/types/summary";

const AppContextProvider = ({ children }: ContextProviderProps) => {
  const { data: order, isFetching } = useOrder();

  const [image, setImage] = useState<UploadedImage>(INITIAL_IMAGE);
  const [dimensionId, setDimensionId] = useState<string>();
  const [materialId, setMaterialId] = useState<string>();
  const [stepper, setStepper] = useState(0);
  const [form, setForm] = useState<FormInputs>();
  const [summary, setSummary] = useState<Summary>();
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    if (order) {
      setImage({
        url: order.image?.url,
        status: order.image?.status ?? ImageStatus.DEFAULT,
        size: order.image?.size ?? 0,
        name: order.image?.name,
      });
      setForm({
        firstName: order.form?.firstName,
        lastName: order.form?.lastName,
        address: order.form?.address,
        city: order.form?.city,
        company: order.form?.company,
        email: order.form?.email,
        phone: order.form?.phone,
        postalCode: order.form?.postalCode,
      });
      setSummary({
        payment: order.summary?.payment,
        delivery: order.summary?.delivery,
      });
      setShoppingCart({
        images: order.shoppingCart?.images,
      });
      setTotalPrice(order.totalPrice);
    }
  }, [isFetching, order]);

  const CONTEXT_VALUE: AppContextProps = {
    state: {
      image,
      stepper,
      form,
      summary,
      dimensionId,
      materialId,
      shoppingCart,
      totalPrice
    },
    stateAction: {
      setImage,
      setStepper,
      setForm,
      setSummary,
      setDimensionId,
      setMaterialId,
      setShoppingCart,
      setTotalPrice
    },
  };

  return (
    <AppContext.Provider value={CONTEXT_VALUE}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
