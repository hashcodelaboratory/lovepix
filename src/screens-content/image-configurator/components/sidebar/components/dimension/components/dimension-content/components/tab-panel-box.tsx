import { CSSProperties } from "react";
import styles from "../../../../../../../image-configurator-layout.module.scss";

type Props = {
  x: number;
  y: number;
  onClick?: () => void;
  selected?: boolean;
  style?: CSSProperties;
};

const TabPanelBox = ({ x, y, onClick, selected, style = {} }: Props) => {
  return (
    <div
      className={styles.tabPanelBox}
      style={{
        borderColor: selected ? "#1976d2" : "inherit",
        boxShadow: selected ? "4px 4px 4px #1976d2" : "4px 4px 4px silver",
        ...style,
      }}
      onClick={onClick}
    >
      <p style={{ fontSize: 12 }}>
        {x} x {y} cm
      </p>
    </div>
  );
};

export default TabPanelBox;
