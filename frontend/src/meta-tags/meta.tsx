import Head from "next/head";
import { useTranslation } from "react-i18next";
import { messages } from "messages/messages";
import { useEffect, useState } from "react";

type MetaTagsType = {
    desc?: string;
}

const MetaTags = ({desc}: MetaTagsType) => {
    const {t} = useTranslation();
    const [description, setDescription]= useState("");
    const [keywords, setKeywords]= useState("");
    const [author, setAuthor]= useState("");
    const [title, setTitle]= useState("");
    const [url_page, setUrl_Page]= useState("");
    const [image, setImage]= useState("");
    useEffect(() => {
        setDescription(t(desc ?? messages.metaDescriptionDefault));
        setKeywords(t(messages.metaKeywordsText));
        setAuthor(t(messages.metaAuthorText));
        setTitle(document.title);
        setUrl_Page(window.location.href);
        setImage(document.getElementsByTagName("img")[0].src);
    }, [])
    return (
        <Head>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url_page} />
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={description} />
        </Head>
    )
}
export default MetaTags;