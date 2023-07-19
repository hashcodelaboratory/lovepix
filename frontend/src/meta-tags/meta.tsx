import Head from "next/head";
import { useTranslation } from "react-i18next";
import { messages } from "messages/messages";
import { useEffect, useRef, useState} from "react";

type MetaTagsType = {
    desc?: string;
    img?: string;
}

const MetaTags = ({desc,img}: MetaTagsType) => {
    const {t} = useTranslation();
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [url_page, setUrl_Page] = useState("");
    const [image, setImage] = useState("");
    const [images, setImages] = useState("");
    const [img_url, setImg_Url] = useState("");
    //Use effect is necessary for the functionality. Window and document cannot be used outside of it
    useEffect(() => {
        let checkImage;
        const listofImages = document.getElementsByTagName("img");
        //For loop starts from two in order to leave out img components located in the header such as logo and svgs
        for(let i = 2; i < listofImages.length;i++){
            checkImage = listofImages[i].srcset.includes("/_next/image", 0);
            if(checkImage === true){
                setImages(listofImages[i].src)
            }
        }
        if(images === ""){
            setImg_Url(window.location.protocol + "//" + window.location.host + t(img ?? messages.metaDefaultImage));
            console.log(t(img_url))
        }else{
            setImg_Url(images);
        }
        setDescription(t(desc ?? messages.metaDescriptionDefault));
        setKeywords(t(messages.metaKeywordsText)) ;
        setAuthor(t(messages.metaAuthorText)) ;
        setTitle(document.title) ;
        setUrl_Page(window.location.href);
        setImage(t(img_url));
    })
    return (
        <Head>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>
            <meta property="og:title" content={title}/>
            <meta property="og:url" content={url_page}/>
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={description}/>
        </Head>
    )
}
export default MetaTags;