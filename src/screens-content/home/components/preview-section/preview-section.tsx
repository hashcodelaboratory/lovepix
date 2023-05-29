import Container from "@mui/material/Container";
import PreviewRow from "./components/preview-row/preview-row";
import { GalleryItem } from "../../../../common/types/gallery";
import { useCategories } from "../../../../common/api/use-categories";

enum CategoriesUsed {
  NATURE = "Príroda",
  SPACE = "Vesmír"
}

type PreviewSectionProps = {
  galleryData?: GalleryItem[];
}

const PreviewSection = ({ galleryData }: PreviewSectionProps): JSX.Element => {
  const { data: categories } = useCategories();

  const filtered = categories?.filter(({ name }) =>
    name === CategoriesUsed.NATURE || name === CategoriesUsed.SPACE
  );

  return (
    <Container>
      {filtered?.map(({ id, name }) => <PreviewRow key={id} galleryData={galleryData} title={name} />)}
    </Container>
  )
}

export default PreviewSection;