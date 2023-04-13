import { Configuration } from "../../../../../../common/types/configuration";
import styles from "../../../../image-configurator-layout.module.scss";
import { messages } from "../../../../../../messages/messages";
import Header from "../header/header";
import { CheckCircle, Filter3 } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { configurationsTable } from "../../../../../../../database.config";
import { CONFIGURATION_TABLE_KEY } from "../../../../../../common/indexed-db/hooks/keys";

type Props = {
  configuration: Configuration;
}

const Canvas = ({ configuration }: Props): JSX.Element => {
  const { t } = useTranslation();
  const icon = configuration?.saved ? <CheckCircle color='success' /> : <Filter3 />

  const onClick = () => {
    configurationsTable.update(CONFIGURATION_TABLE_KEY, {
      saved: false,
      dimensionId: undefined,
    });
  }

  return (
    <div className={styles.containerPadding}>
      <Header
        icon={icon}
        title={String(t(messages.chooseCrop))}
        success={!!configuration?.saved}
        value={configuration?.saved ? <button onClick={onClick} className={styles.buttonChange}>{String(t(messages.change))}</button> : undefined}
      />
      <hr />
    </div>
  )
}

export default Canvas;