import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import {localizationKey} from "../../../../localization/localization-key";
import {useTranslation} from "react-i18next";
import {useCategories} from "../../../../common/api/use-categories";
import {FOR_PARTNERS} from "../../../../constants/pages/titles";
import {Link} from "@mui/material";
import {Pages} from "../../../../constants/pages/urls";

const FooterLinks = (): JSX.Element => {
  const {data: categories} = useCategories();

  return (
    <Container>
      <div className={styles.footerRow}>
        <FooterColumn
          title={localizationKey.service}
          links={[localizationKey.ourContacts, localizationKey.satisfaction, localizationKey.possibilities, localizationKey.creatingTime, localizationKey.complaint]}
          address={[Pages.OUR_CONTACTS]}
        />
        <FooterColumn
          title={localizationKey.fromPhoto}
          links={[localizationKey.canvasPhoto, localizationKey.acrylPhoto, localizationKey.dibondPhoto]}
          address={[]}
        />
        <FooterColumn
          title={localizationKey.gallery}
          links={categories?.map(({name}) => name) ?? []}
          address={[]}
        />
        <FooterColumn
          title={"Lovepix"}
          links={[localizationKey.materials, localizationKey.story, FOR_PARTNERS, localizationKey.download, localizationKey.blog]}
          address={[]}
        />
      </div>
    </Container>
  );
};

type FooterColumnType = {
  title: string;
  links: string[];
  address: string[];
}

const FooterColumn = ({title, links, address}: FooterColumnType): JSX.Element => {
  const {t} = useTranslation();
  let ret = [];
  for (let i = 0; i < links.length; i++) {
    ret.push(<Link href={address[i] ?? Pages.NONE} key={links[i]} className={styles.footerText}>{t(links[i])}</Link>);
  }
  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>{t(title)}</h3>
      {ret}
    </div>
  );
};

export default FooterLinks;