import Container from "@mui/material/Container";
import PreviewRow from "./components/preview-row/preview-row";

const PreviewSection = (): JSX.Element => {
  return (
    <Container>
      <PreviewRow />
      <PreviewRow />
    </Container>
  )
}

export default PreviewSection;