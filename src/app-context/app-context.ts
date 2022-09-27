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
        setImageUrl: Dispatch<SetStateAction<string | undefined>>;
        setImageStatus: Dispatch<SetStateAction<ImageStatus>>;
        setStepper: Dispatch<SetStateAction<number>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
