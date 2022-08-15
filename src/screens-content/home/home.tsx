import UploadImage from "./components/upload-image";
import {Container} from "@mui/material";
import Steps from "./components/steps";
import Materials from "./components/materials";

const HomeLayout = () => {
    return(
        <Container>
            <UploadImage />
            <Steps />
            <Materials />
        </Container>
    )
}

export default HomeLayout;