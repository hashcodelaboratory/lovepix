import Header from "../header/header";
import { CheckCircle, Filter2 } from "@mui/icons-material";
import styles from "../../../../image-configurator-layout.module.scss";
import { messages } from "../../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import DimensionContent from "./components/dimension-content/dimension-content";
import { Configuration } from "../../../../../../common/types/configuration";

type DimensionProps = {
  configuration: Configuration;
}

const Dimension = ({ configuration }: DimensionProps) => {
  const { t } = useTranslation();

  const icon = configuration?.dimensionId ? <CheckCircle color='success' /> : <Filter2 />

  return (
    <div className={styles.containerPadding}>
      <div className={styles.dimension}>
        <Header
          icon={icon}
          title={String(t(messages.chooseDimension))}
          success={!!configuration?.dimensionId}
        />
        <DimensionContent configuration={configuration} />
      </div>
      <hr />
    </div>
  );
};

export default Dimension;
