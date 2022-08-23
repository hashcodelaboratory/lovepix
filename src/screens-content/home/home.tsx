import UploadImage from "./components/upload-image/upload-image";
import {Container} from "@mui/material";
import Steps from "./components/steps/steps";
import Materials from "./components/materials/materials";
import Gallery from "./components/gallery/gallery";

const HomeLayout = () => {

    // fetch('api/entry', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         title: "title",
    //         slug: "test",
    //         body: "body"
    //     })
    // }).then(a => a.json()).then(b => console.log(b))
    //
    // fetch('/api/entries').then(a => a.json()).then(b => console.log(b))

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