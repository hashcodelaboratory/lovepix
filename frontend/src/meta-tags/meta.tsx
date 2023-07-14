import Head from "next/head";
import { useTranslation } from "react-i18next";
import { messages } from "messages/messages";
import { useEffect, useRef} from "react";

type MetaTagsType = {
    desc?: string;
}

const MetaTags = ({desc}: MetaTagsType) => {
    const {t} = useTranslation();
    const description = useRef("");
    const keywords = useRef("");
    const author = useRef("");
    const title = useRef("");
    const url_page = useRef("");
    const image = useRef("");
    //Use effect is necessary for the functionality. Window and document cannot be used outside of it
    useEffect(() => {
        description.current = t(desc ?? messages.metaDescriptionDefault);
        keywords.current = t(messages.metaKeywordsText)
        author.current = t(messages.metaAuthorText);
        title.current = document.title;
        url_page.current = window.location.href;
        image.current = document.getElementsByTagName("img")[0].src;
    }, [])
    return (
        <Head>
            <meta name="description" content={description.current}/>
            <meta name="keywords" content={keywords.current}/>
            <meta name="author" content={author.current}/>
            <meta property="og:title" content={title.current} />
            <meta property="og:url" content={url_page.current} />
            <meta property="og:image" content={image.current}/>
            <meta property="og:description" content={description.current} />
        </Head>
    )
}
export default MetaTags;