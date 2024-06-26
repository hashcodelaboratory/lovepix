import {Grid} from "@mui/material";
import Information from "./components/information/information"
import styles from "./contacts.module.scss"
import {Map} from "./components/map/map"

const ContactsLayout = (): JSX.Element => {
  return (
    <Grid container spacing={6} className={styles.mainContainer} maxWidth="lg" alignItems="stretch">
      <Grid item xs={12} md={5}>
        <Information/>
      </Grid>

      <Grid item xs={12} md={7} alignItems="center">
        <Map/>
      </Grid>
    </Grid>
  )
}

export default ContactsLayout;