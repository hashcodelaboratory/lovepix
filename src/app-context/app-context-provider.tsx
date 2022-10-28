import AppContext, { AppContextProps, UploadedImage } from "./app-context";
import { useEffect, useState } from "react";
import { FormInputs } from "../screens-content/shopping-cart/components/summary/components/form/utils/types";
import { SummaryFormInputs } from "../screens-content/shopping-cart/components/summary/components/delivery/utils/types";
import { ContextProviderProps } from "./types";
import { useOrder } from "../screens-content/home/api/order/useOrder";
import { ImageStatus } from "./enums";
import { INITIAL_IMAGE } from "./consts";

const AppContextProvider = ({ children }: ContextProviderProps) => {
  const { data: order, isFetching } = useOrder();

  const [image, setImage] = useState<UploadedImage>(INITIAL_IMAGE);
  const [dimensionId, setDimensionId] = useState<string | undefined>(undefined);
  const [stepper, setStepper] = useState(0);
  const [form, setForm] = useState<FormInputs>();
  const [summary, setSummary] = useState<SummaryFormInputs>();

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
    }
  }, [isFetching]);

  const CONTEXT_VALUE: AppContextProps = {
    state: {
      image: image,
      stepper: stepper,
      form: form,
      summary: summary,
      dimensionId: dimensionId,
    },
    stateAction: {
      setImage: setImage,
      setStepper: setStepper,
      setForm: setForm,
      setSummary: setSummary,
      setDimensionId: setDimensionId,
    },
  };

  return (
    <AppContext.Provider value={CONTEXT_VALUE}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
