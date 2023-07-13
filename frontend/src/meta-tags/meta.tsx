import Head from "next/head";
import { useTranslation } from "react-i18next";

type MetaTagsType = {
    desc?: string;
}

const MetaTags = ({desc}: MetaTagsType) => {
    const {t} = useTranslation();
    if (typeof window == 'undefined') { 
        return (
            <></>
        )
    }    
    const title = document.title;
    const url_page = window.location.href;
    const image = document.getElementsByTagName("img")[0].src;
    let description = desc ?? "Basic description (desc is undefined)";
    return (
        <Head>
            <meta name="description" content={t(description)}/>
            <meta name="keywords" content="plátno, tlac platno, potlac, potlac predmetov, tlac na alucobond, hlinikova doska, obazy na platne, rychle dodanie, zazitky na fotke, fotka na zelanie, obraz na zelanie"/>
            <meta name="author" content="Hashlab s.r.o."/>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url_page} />
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={t(description)} />
        </Head>
    )
}
export default MetaTags;