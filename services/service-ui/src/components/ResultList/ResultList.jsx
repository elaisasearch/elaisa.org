import React from 'react';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import styles from "../../assets/jss/ResultListStyle";


class ResultList extends React.Component {

    renderList = (resultDocs) => {

        return <div style={styles.resultListRoot}>
            <Typography style={styles.resultDocsLength} variant="caption">{`${this.props.resultDocsLength} results for "${this.props.searchValue}"`}</Typography>
            <List className={styles.root}>
                {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} />
                ))}
            </List>
        </div>
    }

    renderProgress = (value) => {
        return <div style={styles.progress}>
            <CircularProgress value={value}/>
        </div>
    }

    // renderItems = (resultDocs, classes) => {
    //     let i = 0
    //     while (i <= resultDocs.length) {
    //         i = i + 1;
    //         console.log(i)
    //         return this.renderProgress()
    //     }
    //     return this.renderList(resultDocs, classes)
    // }

    render() {
        const { resultDocs } = this.props;
        
        return this.renderList(resultDocs);
    }

}

export default ResultList;
