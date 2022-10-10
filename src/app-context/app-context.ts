import {createContext, Dispatch, SetStateAction} from "react";
import {ImageStatus} from "./imageStatus";
import {SummaryFormInputs} from "../screens-content/shopping-cart/components/summary/components/delivery/utils/types";
import {FormInputs} from "../screens-content/shopping-cart/components/summary/components/form/utils/types";

export type UploadedImage = {
    url?: string;
    status: ImageStatus;
    size: number;
    name?: string;
}

export type AppContextProps = {
    state: {
        image: UploadedImage;
        stepper: number;
        form?: FormInputs;
        summary?: SummaryFormInputs;
    },
    stateAction: {
        setImage: Dispatch<SetStateAction<UploadedImage>>;
        setStepper: Dispatch<SetStateAction<number>>;
        setForm: Dispatch<SetStateAction<FormInputs | undefined>>;
        setSummary: Dispatch<SetStateAction<SummaryFormInputs | undefined>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
