import styles from "../home.module.scss";
import {useTranslation} from "next-i18next";
import {messages} from "../../../messages/messages";
import {GALLERY} from "../utils/gallery";
import Image from "next/image";
import {ImageLayout} from "../enums/enums";

const Gallery = () => {

    const { t } = useTranslation();

    const { pickOneOfOurPhotos, noPhoto, lookAtOurGallery } = messages;

    const gallery = GALLERY.map(({ img }) =>
        <div key={img} className={styles.galleryItem}>
            <Image src={img} width={350} height={300} layout={ImageLayout.FIXED}/>
        </div>
    );

    return(
        <div className={styles.galleryContainer}>
            <h1>{String(t(pickOneOfOurPhotos))}</h1>
            <div className={styles.gallerySubtitle}>{String(t(noPhoto))}</div>
            <div className={styles.gallerySubtitle}>{String(t(lookAtOurGallery))}</div>
            <div className={styles.galleryRow}>{gallery}</div>
        </div>
    )
}

export default Gallery;