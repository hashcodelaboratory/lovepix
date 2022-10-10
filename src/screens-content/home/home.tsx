import UploadImage from "./components/upload-image/upload-image";
import {Container} from "@mui/material";
import {useOrder} from "./api/order/useOrder";
import {useContext, useEffect} from "react";
import AppContext from "../../app-context/app-context";
import {ImageStatus} from "../../app-context/imageStatus";

const HomeLayout = () => {
    const { stateAction: { setImage } } = useContext(AppContext);

    const { data: order, isFetching } = useOrder();

    useEffect(() => {
        setImage({
            url: order?.image?.url ?? undefined,
            status: order?.image?.status ?? ImageStatus.DEFAULT,
            size: order?.image?.size ?? 0,
            name: order?.image?.name ?? undefined
        });
    }, [isFetching]);

    return (
        <Container>
            <UploadImage />
            {/*<Steps />*/}
            {/*<Materials />*/}
        </Container>

    );
}


export default HomeLayout;