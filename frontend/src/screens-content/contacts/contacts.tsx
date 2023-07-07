import { Container, Grid} from "@mui/material";
import Information from "./components/information/information"
import styles from "./contacts.module.scss"
import Map from "./components/map/map"
const ContactsLayout = (): JSX.Element => {
  return (
    <Container className={styles.mainContainer}>
      <Information></Information>
      <Map></Map>
    </Container>
  )
}

export default ContactsLayout;