import type {NextPage} from "next";
import {GetStaticProps} from "next";
import styles from "../styles/Home.module.css";
import ResponsiveAppBar from "../src/app-bar/responsive-app-bar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import FooterLayout from "../src/screens-content/footer/footer";
import GalleryLayout from "../src/screens-content/gallery/gallery";

const Gallery: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <GalleryLayout/>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  );
};

export default Gallery;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "sk", ["common"])),
    },
  };
};
