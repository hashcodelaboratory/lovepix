import AppContext, { AppContextProps } from "./app-context";
import { useState } from "react";
import { ContextProviderProps } from "./types";

const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [stepper, setStepper] = useState(0);

  const CONTEXT_VALUE: AppContextProps = {
    state: { stepper },
    stateAction: { setStepper },
  };

  return (
    <AppContext.Provider value={CONTEXT_VALUE}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
