import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import { messages } from "../../../../messages/messages";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../common/api/use-categories";
import { FOR_PARTNERS } from "../../../../constants/pages/titles";
import { Link } from "@mui/material";
import * as PagesUrls from "../../../../constants/pages/urls";

const FooterLinks = (): JSX.Element => {
  const { data: categories } = useCategories();

  return (
    <Container>
      <div className={styles.footerRow}>
        <FooterColumn
          title={messages.service}
          links={[messages.ourContacts, messages.satisfaction, messages.possibilities, messages.creatingTime, messages.complaint]}
          address={[PagesUrls.OUR_CONTACTS]}
        />
        <FooterColumn
          title={messages.fromPhoto}
          links={[messages.canvasPhoto, messages.acrylPhoto, messages.dibondPhoto]}
          address={[]}
        />
        <FooterColumn
          title={messages.gallery}
          links={categories?.map(({ name }) => name) ?? []}
          address={[]}
        />
        <FooterColumn
          title={"Lovepix"}
          links={[messages.materials, messages.story, FOR_PARTNERS, messages.download, messages.blog]}
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

const FooterColumn = ({ title, links, address}: FooterColumnType): JSX.Element => {
  const { t } = useTranslation();
  let ret = [];
  for(let i=0; i<links.length;i++){
    ret.push(<Link href={address[i] ?? PagesUrls.NONE} key={links[i]} className={styles.footerText}>{t(links[i])}</Link>);
  }
  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>{t(title)}</h3>
      {ret}
    </div>
  );
};

export default FooterLinks;