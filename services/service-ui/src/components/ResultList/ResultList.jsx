import React from 'react';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';
import { Typography } from '@material-ui/core';
import styles from "../../assets/jss/ResultListStyle";


const ResultList = (props) => {

    const { resultDocs } = props;

    const renderList = (resultDocs) => {

        return <div style={styles.resultListRoot}>
            <Typography style={styles.resultDocsLength} variant="caption">{`${props.resultDocsLength} results for "${props.searchValue}"`}</Typography>
            <List>
                {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} />
                ))}
            </List>
        </div>
    }

    return renderList(resultDocs);
}

export default ResultList;
