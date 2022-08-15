import UploadImage from "./components/upload-image";
import {Container} from "@mui/material";
import Steps from "./components/steps";
import Materials from "./components/materials";
import Gallery from "./components/gallery";

const HomeLayout = () => {
    return(
        <Container>
            <UploadImage />
            <Steps />
            <Materials />
            <Gallery />
        </Container>
    )
}

export default HomeLayout;