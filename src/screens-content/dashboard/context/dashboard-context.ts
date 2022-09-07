import {createContext} from "react";
import {StorageReference} from "@firebase/storage";

type DashboardContextProps = {
    state: {
        uploadedImages: StorageReference[];
    }
}

const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export default DashboardContext;