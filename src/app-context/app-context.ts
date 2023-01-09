import { createContext, Dispatch, SetStateAction } from "react";
import { ImageStatus } from "./enums";
import {FormInputs} from "../common/types/form";
import {Summary} from "../common/types/summary";

export type UploadedImage = {
    url?: string;
    status: ImageStatus;
    size: number;
    name?: string;
}

export type ShoppingCartImage = {
    name: string;
    url: string;
    qty: number;
    origin: string;
    width: number;
    height: number;
    material: string;
}

export type ShoppingCart = {
    images: ShoppingCartImage[];
}

export type AppContextProps = {
    state: {
        image: UploadedImage;
        stepper: number;
        form?: FormInputs;
        summary?: Summary;
        dimensionId?: string;
        materialId?: string;
        shoppingCart?: ShoppingCart;
    },
    stateAction: {
        setImage: Dispatch<SetStateAction<UploadedImage>>;
        setStepper: Dispatch<SetStateAction<number>>;
        setForm: Dispatch<SetStateAction<FormInputs | undefined>>;
        setSummary: Dispatch<SetStateAction<Summary | undefined>>;
        setDimensionId: Dispatch<SetStateAction<string | undefined>>;
        setMaterialId: Dispatch<SetStateAction<string | undefined>>;
        setShoppingCart: Dispatch<SetStateAction<ShoppingCart | undefined>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
