import styles from "../../../../../../../image-configurator-layout.module.scss";
import Image from "next/image";

type Props = {
  url: string;
  x: number;
  y: number;
  onClick?: () => void;
};

const TabPanelBox = ({ url, x, y, onClick }: Props) => {
  return (
    <div className={styles.tabPanelBox} onClick={onClick}>
      <Image src={url} width={50} height={50} objectFit='cover' />
      <p>
        {x} x {y} cm
      </p>
    </div>
  );
};

export default TabPanelBox;
