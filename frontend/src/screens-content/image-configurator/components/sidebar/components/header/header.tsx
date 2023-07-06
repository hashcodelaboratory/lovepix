import styles from "../../../../image-configurator-layout.module.scss";

type Props = {
  icon: JSX.Element
  title: string
  success: boolean;
  value?: JSX.Element;
}

const Header = ({ icon, title, success, value }: Props) => {
  return (
    <div className={styles.headerComponent}>
      <div className={styles.header}>
        {icon}
        <h4 className={styles.headerTitle}
            style={{ color: success ? "green" : "black" }}
        >
          {title}
        </h4>
      </div>
      {value}
    </div>
  );
};

export default Header;
