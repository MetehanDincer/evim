import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type, url, image }) {
    const siteTitle = "ENİYİKATILIM - Katılım Finans Karşılaştırma Platformu";
    const defaultDescription = "Türkiye'nin en kapsamlı faizsiz ev, araba ve tasarruf finansman şirketleri karşılaştırma platformu. En uygun katılım planlarını hemen hesaplayın.";

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | ENİYİKATILIM` : siteTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            <meta name="keywords" content="katılım evim, faizsiz ev, peşinatsız ev, faizsiz araba, tasarruf finansman, katılım bankacılığı, evim, eminevim, fuzulev, birevim" />
            <link rel="canonical" href={url || window.location.href} />

            {/* Open Graph tags */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={title ? `${title} | ENİYİKATILIM` : siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:site_name" content="ENİYİKATILIM" />
            {/* <meta property="og:image" content={image || '/og-image.jpg'} /> */}

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | ENİYİKATILIM` : siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {/* <meta name="twitter:image" content={image || '/og-image.jpg'} /> */}
        </Helmet>
    );
}
