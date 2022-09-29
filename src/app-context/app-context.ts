import {createContext, Dispatch, SetStateAction} from "react";

type AppContextProps = {
    state: {
        uploadedImageUrl?: string;
    },
    stateAction: {
        setUploadedImageUrl: Dispatch<SetStateAction<string | undefined>>;
    }
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
