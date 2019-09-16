import React from 'react';
import { Helmet } from 'react-helmet';

const HeaderTags = (props) => {

    const { title, desc, keywords } = props;

    let basicKeywords = "Search, Search Engine, Language Level, Elaisa, Language"
    let extendKeywords = `${keywords}, ${basicKeywords}`

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="keywords" content={extendKeywords} />
            <meta name="author" content="Alexander Teusz" />
            <meta name="copyright" content="Copyright-Alexander Teusz" />
            <meta name="robots" content="follow" />
        </Helmet>
    );
};

export default HeaderTags;