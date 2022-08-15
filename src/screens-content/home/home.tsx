import UploadImage from "./components/upload-image";
import {Container} from "@mui/material";
import Steps from "./components/steps";

const HomeLayout = () => {
    return(
        <Container>
            <UploadImage />
            <Steps />
        </Container>
    )
}

export default HomeLayout;