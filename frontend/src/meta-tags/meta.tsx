import Head from "next/head";
import { useTranslation } from "react-i18next";
import { messages } from "messages/messages";

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
    let description = desc ?? "Description was not provided";
    return (
        <Head>
            <meta name="description" content={t(description)}/>
            <meta name="keywords" content={t(messages.metaKeywordsText)}/>
            <meta name="author" content={t(messages.metaAuthorText)}/>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url_page} />
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={t(description)} />
        </Head>
    )
}
export default MetaTags;