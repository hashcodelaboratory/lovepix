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

const Material = () => {
  const { t } = useTranslation();

  const materials = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fdibond?alt=media&token=f4447146-e623-4fbb-b4e5-97cb8082f9c5",
      id: "1",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fcanvas?alt=media&token=18852992-441d-44ce-89c6-5883ee2193da",
      id: "2",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Facrylate?alt=media&token=25c03132-9fbe-421e-ab43-0a16b4c128f0",
      id: "3",
    },
  ];

  const {
    state: { materialId },
    stateAction: { setMaterialId },
  } = useContext(AppContext);

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
        {materials.map((material) => (
          <Image
            onClick={() => setMaterialId(material.id)}
            alt={material.id}
            key={uuidv4()}
            src={material?.image ?? ""}
            height={material.id === materialId ? 120 : 100}
            width={material.id === materialId ? 120 : 100}
            layout={ImageLayout.FIXED}
            objectFit='cover'
            style={{
              borderRadius: 5,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <hr />
    </div>
  );
};

export default Material;
