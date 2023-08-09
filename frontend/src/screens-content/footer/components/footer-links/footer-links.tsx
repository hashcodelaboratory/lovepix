import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import {localizationKey} from "../../../../localization/localization-key";
import {useCategories} from "../../../../common/api/use-categories";
import {FOR_PARTNERS} from "../../../../constants/pages/titles";
import {Link as MUILink} from "@mui/material";
import {useTranslation} from "next-i18next";
import React from "react";
import Link from "next/link";
import {Pages} from "../../../../constants/pages/urls";
import {composeUrlWithQuery} from "./util";
import {materials} from "../../../home/utils/configuration"
import { Material } from "common/enums/material";

type Link = {
  label: string;
  href: string | undefined;
}

const serviceLinks: Link[] = [{
  label: localizationKey.ourContacts,
  href: Pages.CONTACT
}, {
  label: localizationKey.satisfaction,
  // TODO: TBD
  href: Pages.SATISFACTION
}, {
  label: localizationKey.possibilities,
  // TODO: TBD
  href: Pages.POSSIBILITIES
}, {
  label: localizationKey.creatingTime,
  // TODO: TBD
  href: Pages.PRODUCTION_TIME
}, {
  label: localizationKey.complaint,
  // TODO: TBD
  href: Pages.COMPLAINT
}]

const fromPhotoLinks: Link[] = [{
  label: localizationKey.canvasPhoto,
  // TODO: TBD
  href: Pages.MATERIALS
}, {
  label: localizationKey.acrylPhoto,
  // TODO: TBD
  href: Pages.MATERIALS
}, {
  label: localizationKey.dibondPhoto,
  // TODO: TBD
  href: Pages.MATERIALS
}]

const lovePixLinks: Link[] = [{
  label: localizationKey.materials,
  href: Pages.MATERIALS,
}, {
  label: localizationKey.story,
  href: Pages.ABOUT_US
}, {
  label: FOR_PARTNERS,
  href: Pages.FOR_PARTNERS
}, {
  label: localizationKey.download,
  // TODO: TBD
  href: Pages.DOWNLOAD,
}, {
  label: localizationKey.blog,
  // TODO: TBD
  href: Pages.BLOG
}]

const FooterLinks = (): JSX.Element => {
  const {data: categories} = useCategories();

  const galleryLinks: Link[] = (categories ?? []).map(({name}) => ({
    label: name,
    href: composeUrlWithQuery(Pages.GALLERY, {category: name})
  }))

  const footerColumns: { title: string, links: Link[] }[] = [{
    title: localizationKey.service,
    links: serviceLinks,
  }, {
    title: localizationKey.fromPhoto,
    links: fromPhotoLinks
  }, {
    title: localizationKey.gallery,
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