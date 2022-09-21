import styles from "../../shopping-cart.module.scss";
import {Container} from "@mui/system";
import Cart from "./cart/cart";
import Delivery from "./delivery/delivery";

const Summary = () => (
    <Container className={styles.summary}>
        <Cart />
        <Delivery />
    </Container>
)

export default Summary