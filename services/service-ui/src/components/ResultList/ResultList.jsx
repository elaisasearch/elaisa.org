import React from 'react';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';
import { Typography } from '@material-ui/core';
import styles from "../../assets/jss/ResultListStyle";

/**
 * The Result list to show all result items.
 * @param {object} props the given properties.
 * @return {JSX} Result list component.
*/
const ResultList = (props) => {

    const { resultDocs } = props;

    /**
     * Render the list given the result docs.
     * @param {object} resultDocs the found result documents.
     * @return {JSX} result list.
    */
    const renderList = (resultDocs) => {

        return <div style={styles.resultListRoot}>
            <Typography style={styles.resultDocsLength} variant="caption">{`${props.resultDocsLength} results for "${props.searchValue}"`}</Typography>
            <List>
                {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} level_meta={doc.level_meta} />
                ))}
            </List>
        </div>
    }

    return renderList(resultDocs);
}

export default ResultList;
