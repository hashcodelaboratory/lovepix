import UploadImagePart from "./components/upload-image-part";
import {Container} from "@mui/material";
import StepsPart from "./components/steps-part";

const Main = () => {
    return(
        <Container>
            <UploadImagePart />
            <StepsPart />
        </Container>
    )
}

export default Main;