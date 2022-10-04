import {createContext, Dispatch, SetStateAction} from "react";
import {ImageStatus} from "./imageStatus";

export type UploadedImage = {
    url?: string;
    status: ImageStatus;
    size: number;
}

export type AppContextProps = {
    state: {
        image: UploadedImage;
        stepper: number;
    },
    stateAction: {
        setImage: Dispatch<SetStateAction<UploadedImage>>;
        setStepper: Dispatch<SetStateAction<number>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
