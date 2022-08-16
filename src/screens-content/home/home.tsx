import UploadImage from "./components/upload-image/upload-image";
import {Container} from "@mui/material";
import Steps from "./components/steps/steps";
import Materials from "./components/materials/materials";
import Gallery from "./components/gallery/gallery";

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