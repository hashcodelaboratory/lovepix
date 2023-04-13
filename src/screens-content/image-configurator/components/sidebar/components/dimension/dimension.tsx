import Header from "../header/header";
import { CheckCircle, Filter2 } from "@mui/icons-material";
import styles from "../../../../image-configurator-layout.module.scss";
import { messages } from "../../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import DimensionContent from "./components/dimension-content/dimension-content";
import { Configuration } from "../../../../../../common/types/configuration";
import { DIMENSIONS } from "../../../../../../common/configuration/dimensions/dimensions";

type DimensionProps = {
  configuration: Configuration;
}

const Dimension = ({ configuration }: DimensionProps) => {
  const { t } = useTranslation();

  const icon = configuration?.dimensionId ? <CheckCircle color='success' /> : <Filter2 />

  const dim = DIMENSIONS.find(
    (dim) => dim.id === configuration?.dimensionId,
  );

  const value = dim ? `(${dim?.width} x ${dim?.height})` : undefined;

  return (
    <div className={styles.containerPadding}>
      <div className={styles.dimension}>
        <Header
          icon={icon}
          title={String(t(messages.chooseDimension))}
          success={!!configuration?.dimensionId}
          value={<div>{value}</div>}
        />
        {!configuration?.dimensionId && <DimensionContent configuration={configuration} />}
      </div>
      <hr />
    </div>
  );
};

export default Dimension;
