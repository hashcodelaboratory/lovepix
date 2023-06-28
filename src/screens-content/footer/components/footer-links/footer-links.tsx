import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import { messages } from "../../../../messages/messages";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../common/api/use-categories";
import { FOR_PARTNERS } from "../../../../constants/pages/titles";

const FooterLinks = (): JSX.Element => {
  const { data: categories } = useCategories();

  return (
    <Container>
      <div className={styles.footerRow}>
        <FooterColumn
          title={messages.service}
          links={[messages.ourContacts, messages.satisfaction, messages.possibilities, messages.creatingTime, messages.complaint]}
        />
        <FooterColumn
          title={messages.fromPhoto}
          links={[messages.canvasPhoto, messages.acrylPhoto, messages.dibondPhoto]}
        />
        <FooterColumn
          title={messages.gallery}
          links={categories?.map(({ name }) => name) ?? []}
        />
        <FooterColumn
          title={"Lovepix"}
          links={[messages.materials, messages.story, FOR_PARTNERS, messages.download, messages.blog]}
        />
      </div>
    </Container>
  );
};

type FooterColumnType = {
  title: string;
  links: string[];
}

const FooterColumn = ({ title, links }: FooterColumnType): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>{t(title)}</h3>
      {links.map((link) => <p key={link} className={styles.footerText}>{t(link)}</p>)}
    </div>
  );
};

export default FooterLinks;