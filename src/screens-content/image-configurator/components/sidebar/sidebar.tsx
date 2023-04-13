import styles from "../../image-configurator-layout.module.scss";
import Preview from "./components/preview/preview";
import Dimension from "./components/dimension/dimension";
import Material from "./components/material/material";
import Price from "./components/price/price";
import Button from "./components/button/button";
import { Configuration } from "../../../../common/types/configuration";
import Canvas from "./components/canvas/canvas";

type SidebarProps = {
  configuration: Configuration;
}

const Sidebar = ({ configuration }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <Preview configuration={configuration} />
      <Dimension configuration={configuration} />
      <Canvas configuration={configuration} />
      <Material configuration={configuration} />
      <Price configuration={configuration} />
      <Button />
    </div>
  );
};

export default Sidebar;
