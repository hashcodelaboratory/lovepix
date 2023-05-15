import Container from "@mui/material/Container";
import PreviewRow from "./components/preview-row/preview-row";
import { GalleryItem } from "../../../../common/types/gallery";

type PreviewSectionProps = {
  galleryData?: GalleryItem[];
}

const PreviewSection = ({ galleryData }: PreviewSectionProps): JSX.Element => {
  return (
    <Container>
      <PreviewRow galleryData={galleryData} />
      <PreviewRow galleryData={galleryData?.slice(3, galleryData?.length - 1)} />
    </Container>
  )
}

export default PreviewSection;