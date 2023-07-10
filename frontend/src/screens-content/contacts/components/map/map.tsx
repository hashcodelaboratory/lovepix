import { Container } from "@mui/material";
import styles from "../../contacts.module.scss"

const Map = (): JSX.Element => {
  return (
    <Container className={styles.mapContainer}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20964.90383037062!2d20.570601137573224!3d48.9418129193509!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e48d648219f07%3A0xd2785923a1999842!2sPROGRUP%20SK%2C%20s.r.o.!5e0!3m2!1ssk!2ssk!4v1688720904220!5m2!1ssk!2ssk" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.googleMap}></iframe>
    </Container>
  );
};

export default Map;