import type {GetStaticProps, NextPage} from "next";
import styles from "../styles/Home.module.css";
import ResponsiveAppBar from "../src/app-bar/responsive-app-bar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import HomeLayout from "../src/screens-content/home/home";
import {useLiveQuery} from "dexie-react-hooks";
import {configurationsTable} from "../database.config";
import {CONFIGURATION_TABLE_KEY} from "../src/common/indexed-db/hooks/keys";
import {useGallery} from "../src/common/api/use-gallery";
import FooterLayout from "../src/screens-content/footer/footer";
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || '');

const Home: NextPage = () => {
  const configuration = useLiveQuery(() => configurationsTable.get(CONFIGURATION_TABLE_KEY), []);

  const {data: galleryData} = useGallery();

  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <HomeLayout configuration={configuration} galleryData={galleryData}/>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "sk", ["common"])),
    },
  };
};
