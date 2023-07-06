import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { CheckCircle, Filter3 } from "@mui/icons-material";
import { messages } from "../../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { ImageLayout } from "screens-content/home/enums/enums";
import { materials } from "screens-content/home/utils/configuration";
import { configurationsTable } from "../../../../../../../database.config";
import { CONFIGURATION_TABLE_KEY } from "../../../../../../common/indexed-db/hooks/keys";
import { Configuration } from "../../../../../../common/types/configuration";

type MaterialProps = {
  configuration: Configuration;
}

const Material = ({ configuration }: MaterialProps) => {
  const { t } = useTranslation();

  const changeMaterial = (id: string) => {
    configurationsTable.update(CONFIGURATION_TABLE_KEY, {
      material: id,
    });
  };

  const materialItems = materials.map((material) => (
    <div
      key={material.id}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className={
          material.id === configuration?.material
            ? styles.imageWrapper
            : styles.relativeContainer
        }
      >
        <Image
          onClick={() => changeMaterial(material.id)}
          alt={material.id}
          key={uuidv4()}
          src={material?.image ?? ""}
          height={112}
          width={112}
          layout={ImageLayout.INTRINSIC}
          objectFit="cover"
          style={{
            cursor: "pointer",
          }}
        />
      </div>
      <p className={styles.materialCardTitle}>{material.name}</p>
    </div>
  ));

  const icon = configuration?.material ? <CheckCircle color="success" /> : <Filter3 />;

  return (
    <div className={styles.containerPadding}>
      <Header
        icon={icon}
        title={String(t(messages.chooseMaterial))}
        success={!!configuration?.material}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {materialItems}
      </div>
      <hr />
    </div>
  );
};

export default Material;