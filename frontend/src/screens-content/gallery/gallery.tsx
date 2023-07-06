import Container from "@mui/material/Container";
import { useGallery } from "../../common/api/use-gallery";
import Image from "next/image";
import { ImageLayout } from "../home/enums/enums";
import styles from "./gallery.module.scss";
import { useCategories } from "../../common/api/use-categories";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

const GalleryLayout = (): JSX.Element => {
  const { data: gallery } = useGallery();
  const { data: categories } = useCategories();

  const [searchedCategories, setSearchedCategories] = useState<string[]>();

  const filtered = gallery?.filter((image) => searchedCategories?.some((r) => image.categories.includes(r)))

  useEffect(() => {
    setSearchedCategories(categories?.map(({ name }) => name));
  }, [categories]);

  const onClickCategory = (name: string) => {
    const variant = getCategoryVariant(name);
    if (variant === "filled") {
      setSearchedCategories(searchedCategories?.filter((category) => category !== name));
    } else {
      setSearchedCategories([...(searchedCategories) ?? [], name]);
    }
  }

  const getCategoryVariant = (name: string) => {
    return searchedCategories?.includes(name) ? "filled" : "outlined";
  }

  return (
    <Container>
      <div className={styles.galleryCategoryRow}>
        {categories?.map(({ id, name }) => (
          <Chip
            key={id}
            label={name}
            color="primary"
            variant={getCategoryVariant(name)}
            clickable
            onClick={() => onClickCategory(name)}
            className={styles.galleryChip}
          />
        ))}
      </div>
      <div className={styles.galleryRow}>
        {filtered?.map((image) => (
          <div key={image.id}>
            <Image
              src={image?.url}
              layout={ImageLayout.INTRINSIC}
              width={380}
              height={320}
              className={styles.galleryImage}
              alt=""
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default GalleryLayout;