import styles from "../../../../image-configurator-layout.module.scss";

type Props = {
  icon: JSX.Element
  title: string
  success: boolean;
}

const Header = ({ icon, title, success }: Props) => {
  return (
    <div className={styles.header}>
      {icon}
      <h3 className={styles.headerTitle}
          style={{ color: success ? "green" : "black" }}
      >
        {title}
      </h3>
    </div>
  );
};

export default Header;
