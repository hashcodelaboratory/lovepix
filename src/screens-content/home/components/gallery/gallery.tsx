import styles from "../../home.module.scss";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";
import {Carousel} from "@mantine/carousel";
import {GALLERY} from "../../utils/gallery";
import {ImageLayout} from "../../enums/enums";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

const Gallery = () => {

    const { t } = useTranslation();

    const { pickOneOfOurPhotos, noPhoto, lookAtOurGallery } = messages;

    const gallery = GALLERY.map(({ img }) =>
        <Carousel.Slide key={uuidv4()}>
            <Image className={styles.roundedImage} alt={img} src={img} width={350} height={300} layout={ImageLayout.FIXED}/>
        </Carousel.Slide>
    );

    return(
        <div className={styles.galleryContainer}>
            <h1>{String(t(pickOneOfOurPhotos))}</h1>
            <div className={styles.gallerySubtitle}>{String(t(noPhoto))}</div>
            <div className={styles.gallerySubtitle}>{String(t(lookAtOurGallery))}</div>
            <div className={styles.galleryRow}>
                <Carousel
                    height={300}
                    slideSize="20%"
                    slideGap="xs"
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '30%' },
                        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    loop
                    align="start"
                >
                    {gallery}
                </Carousel>
            </div>
        </div>
    )
}

export default Gallery;