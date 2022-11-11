import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Filter3 } from "@mui/icons-material";
import { messages } from "../../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { ImageLayout } from "screens-content/home/enums/enums";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import { materials } from "screens-content/home/utils/configuration";
const Material = () => {
  const { t } = useTranslation();

  const {
    state: { materialId },
    stateAction: { setMaterialId },
  } = useContext(AppContext);

  const materialItems = materials.map((material) => (
    <div
      key={material.id}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: 14, textAlign: "center" }}>{material.name}</p>
      <div
        className={material.id === materialId ? styles.imageWrapper : undefined}
      >
        <Image
          onClick={() => setMaterialId(material.id)}
          alt={material.id}
          key={uuidv4()}
          src={material?.image ?? ""}
          height={100}
          width={100}
          layout={ImageLayout.FIXED}
          objectFit='cover'
          style={{
            borderRadius: 5,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles.containerPadding}>
      <div className={styles.material}>
        <Header icon={<Filter3 />} title={String(t(messages.chooseMaterial))} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 50,
        }}
      >
        {materialItems}
      </div>

      <hr />
    </div>
  );
};

export default Material;
