import styles from "./query-loader.module.scss";
import { CircularProgress, LinearProgress } from "@mui/material";

export enum LoaderType {
  CIRCULAR = "CIRCULAR",
  LINEAR = "LINEAR"
}

type Props = {
  isLoading: boolean;
  type: LoaderType;
  children?: JSX.Element;
}

// Note: PoC of Loading state for future usage
const QueryLoader = ({ isLoading, type, children }: Props): JSX.Element => {

  const getLoader = () => {
    switch (type) {
      case LoaderType.CIRCULAR:
        return <div className={styles.container}><CircularProgress /></div>;
      case LoaderType.LINEAR:
        return <div className={styles.container}><LinearProgress /></div>;
    }
  };

  if (isLoading) return getLoader();

  return <>{children}</>;
};

export default QueryLoader;