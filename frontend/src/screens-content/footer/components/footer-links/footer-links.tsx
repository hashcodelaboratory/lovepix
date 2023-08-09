import styles from "../../footer.module.scss";
import Container from "@mui/material/Container";
import {localizationKey} from "../../../../localization/localization-key";
import {CategoryType, useCategories} from "../../../../common/api/use-categories";
import {FOR_PARTNERS} from "../../../../constants/pages/titles";
import {Link as MUILink} from "@mui/material";
import {useTranslation} from "next-i18next";
import React from "react";
import Link from "next/link";
import {Pages} from "../../../../constants/pages/urls";
import {composeUrlWithQuery} from "./util";
import { TFunction } from 'react-i18next';

type Link = {
  label: string;
  href: string | undefined;
}

const getServiceLinks = (t: TFunction<"translation", undefined>): Link[] => [{
  label: localizationKey.ourContacts,
  href: t(Pages.CONTACT)
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

const getFromPhotoLinks = (t: TFunction<"translation", undefined>): Link[] => [{
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

const getLovePixLinks = (t: TFunction<"translation", undefined>): Link[] => [{
  label: localizationKey.materials,
  href: t(Pages.MATERIALS),
}, {
  label: localizationKey.story,
  href: t(Pages.ABOUT_US)
}, {
  label: FOR_PARTNERS,
  href: t(Pages.FOR_PARTNERS)
}, {
  label: localizationKey.download,
  // TODO: TBD
  href: Pages.DOWNLOAD,
}, {
  label: localizationKey.blog,
  // TODO: TBD
  href: Pages.BLOG
}]

const getGalleryLinks = (t: TFunction<"translation", undefined>,categories: CategoryType[] | undefined): Link[] => (categories ?? []).map(({name}) => ({
  label: name,
  href: composeUrlWithQuery(t(Pages.GALLERY), {category: name})
}))

const FooterLinks = (): JSX.Element => {
  const {data: categories} = useCategories();
  const {t} = useTranslation()

  const footerColumns: { title: string, links: Link[] }[] = [{
    title: localizationKey.service,
    links: getServiceLinks(t),
  }, {
    title: localizationKey.fromPhoto,
    links: getFromPhotoLinks(t)
  }, {
    title: localizationKey.gallery,
    links: getGalleryLinks(t,categories)
  }, {
    title: "Lovepix", // TODO: extract this to one general place
    links: getLovePixLinks(t)
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