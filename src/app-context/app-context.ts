import {createContext, Dispatch, SetStateAction} from "react";
import {ImageStatus} from "./imageStatus";

export type UploadedImage = {
    url?: string;
    status: ImageStatus;
}

type AppContextProps = {
    state: {
        image: UploadedImage;
    },
    stateAction: {
        setImageUrl: Dispatch<SetStateAction<string | undefined>>;
        setImageStatus: Dispatch<SetStateAction<ImageStatus>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
