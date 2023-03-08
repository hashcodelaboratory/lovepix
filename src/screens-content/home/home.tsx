import { Container } from '@mui/material'
import { Configuration } from "../../common/types/configuration";
import ImageContainer from "./components/upload-image/image-container";

type HomeLayoutProps = {
  configuration: Configuration;
}

const HomeLayout = ({ configuration }: HomeLayoutProps) => (
  <Container>
    <ImageContainer configuration={configuration} />
  </Container>
)

export default HomeLayout
