import { createContext, Dispatch, SetStateAction } from "react";
import { ImageStatus } from "./enums";
import { SummaryFormInputs } from "../screens-content/shopping-cart/components/summary/components/delivery/utils/types";
import { FormInputs } from "../screens-content/shopping-cart/components/summary/components/form/utils/types";

export type UploadedImage = {
    url?: string;
    status: ImageStatus;
    size: number;
    name?: string;
}

export type ShoppingCart = {
    images: {
        name: string;
        url: string;
        qty: number;
        origin: string;
        width: number;
        height: number;
        material: string;
    }[];
}

export type AppContextProps = {
    state: {
        image: UploadedImage;
        stepper: number;
        form?: FormInputs;
        summary?: SummaryFormInputs;
        dimensionId?: string;
        materialId?: string;
        shoppingCart?: ShoppingCart;
    },
    stateAction: {
        setImage: Dispatch<SetStateAction<UploadedImage>>;
        setStepper: Dispatch<SetStateAction<number>>;
        setForm: Dispatch<SetStateAction<FormInputs | undefined>>;
        setSummary: Dispatch<SetStateAction<SummaryFormInputs | undefined>>;
        setDimensionId: Dispatch<SetStateAction<string | undefined>>;
        setMaterialId: Dispatch<SetStateAction<string | undefined>>;
        setShoppingCart: Dispatch<SetStateAction<ShoppingCart | undefined>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
