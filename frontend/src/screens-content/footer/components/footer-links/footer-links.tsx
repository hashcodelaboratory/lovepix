import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import { messages } from "../../../../messages/messages";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../common/api/use-categories";
import { FOR_PARTNERS } from "../../../../constants/pages/titles";
import { Link as MUILink } from "@mui/material";
import Link from "next/link"
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
          address={categories?.map(({ name }) => { return {pathname: PagesUrls.GALLERY, query:{categories: [name]}}}) ?? []}
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
  address: (string | object)[];
}

const FooterColumn = ({ title, links, address}: FooterColumnType): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>{t(title)}</h3>
      {
        links.map((link, i) => 
          <Link href={address[i] ?? PagesUrls.NONE} passHref={true}>
            <MUILink  key={link} className={styles.footerText}>{t(link)}
            </MUILink>
          </Link>)
      }
    </div>
  );
};

export default FooterLinks;