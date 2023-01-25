import { createContext, Dispatch, SetStateAction } from "react";

export type AppContextProps = {
  state: {
    stepper: number;
  };
  stateAction: {
    setStepper: Dispatch<SetStateAction<number>>;
  };
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export default AppContext;
