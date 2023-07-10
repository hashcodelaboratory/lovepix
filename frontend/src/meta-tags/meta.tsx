// TODO : Check remaining static meta tags
//<meta property="og:title" content={base_title}/>
//<meta property="og:url" content={base_url}/>
//<meta property="og:image" content="{obrázok z page, alebo dummy image doplním (P)}"/>
//<meta property="og:description" content="{product description alebo doplnim pre rôzne stránky (hlavne pre landing page)}" />

import Head from "next/head"

const MetaTags = () => {
    
    if (typeof window !== 'undefined') {
        var title = document.title;
        var url_page = window.location.href;
        var image = document.getElementsByTagName("img")[1].src;
        var description = "Description";
        if (title == "Lovepix"){
            description = "Toto je landing page Lovepix"
        }
    return (
        
        <Head>
            <meta name="description" content="Tlač na plátno, Tlač obrazov, Potlač predmetov, Hotové obrazy zo Spiša, Spišská Nová Ves, Slovensko, lovepix.sk, vaše zážitky radi zhmotníme, darčeky, darčekové predmety"/>
            <meta name="keywords" content="plátno, tlac platno, potlac, potlac predmetov, tlac na alucobond, hlinikova doska, obazy na platne, rychle dodanie, zazitky na fotke, fotka na zelanie, obraz na zelanie"/>
            <meta name="author" content="Hashlab s.r.o."/>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url_page} />
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={description} />
        </Head>
        
    )
    }
    else return (<></>)
    
}

export default MetaTags;