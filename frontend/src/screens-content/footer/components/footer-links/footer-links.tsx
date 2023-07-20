import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import {messages} from "../../../../messages/messages";
import {useCategories} from "../../../../common/api/use-categories";
import {FOR_PARTNERS} from "../../../../constants/pages/titles";
import {Link as MUILink} from "@mui/material";
import {useTranslation} from "next-i18next";
import React from "react";
import Link from "next/link";
import {GALLERY} from "constants/pages/urls";
import {composeUrlWithQuery} from "./util";

type Link = {
  label: string;
  href: string | undefined;
}

const serviceLinks: Link[] = [{
  label: messages.ourContacts,
  // TODO: TBD
  href: undefined
}, {
  label: messages.satisfaction,
  // TODO: TBD
  href: undefined
}, {
  label: messages.possibilities,
  // TODO: TBD
  href: undefined
}, {
  label: messages.creatingTime,
  // TODO: TBD
  href: undefined
}, {
  label: messages.complaint,
  // TODO: TBD
  href: undefined
}]

const fromPhotoLinks: Link[] = [{
  label: messages.canvasPhoto,
  // TODO: TBD
  href: undefined
}, {
  label: messages.acrylPhoto,
  // TODO: TBD
  href: undefined
}, {
  label: messages.dibondPhoto,
  // TODO: TBD
  href: undefined
}]

const lovePixLinks: Link[] = [{
  label: messages.materials,
  // TODO: TBD
  href: undefined,
}, {
  label: messages.story,
  // TODO: TBD
  href: undefined
}, {
  label: FOR_PARTNERS,
  // TODO: TBD
  href: undefined
}, {
  label: messages.download,
  // TODO: TBD
  href: undefined
}, {
  label: messages.blog,
  // TODO: TBD
  href: undefined
}]

const FooterLinks = (): JSX.Element => {
  const {data: categories} = useCategories();

  const galleryLinks: Link[] = (categories ?? []).map(({name}) => ({
    label: name,
    href: composeUrlWithQuery(GALLERY, {category: name})
  }))

  const footerColumns: { title: string, links: Link[] }[] = [{
    title: messages.service,
    links: serviceLinks,
  }, {
    title: messages.fromPhoto,
    links: fromPhotoLinks
  }, {
    title: messages.gallery,
    links: galleryLinks
  }, {
    title: "Lovepix", // TODO: extract this to one general place
    links: lovePixLinks
  }]

  const columns = footerColumns.map(({title, links}) => <FooterColumn
    key={title}
    title={title}
    links={links}
  />)

  return (
    <Container>
      <div className={styles.footerRow}>
        {columns}
      </div>
    </Container>
  );
};

type FooterColumnType = {
  title: string;
  links: {
    label: string;
    href: string | undefined;
  }[]
}

const FooterColumn = ({
                        title, links
                      }: FooterColumnType): JSX.Element => {
  const {t} = useTranslation()
  const formattedLinks = links.map(({href, label}) => href && <Link href={href} passHref={true}>
      <MUILink key={label} className={styles.footerText}>
        {t(label)}
      </MUILink>
  </Link>)

  return (
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>{t(title)}</h3>
      {formattedLinks}
    </div>
  );
};

export default FooterLinks;