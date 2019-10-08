import React, { useState } from 'react';
import ResultItem from './ResultItem';
import { Typography, TableBody, TablePagination, Grid } from '@material-ui/core';
import logo from '../../assets/img/logo.png'
import { Translate } from 'react-localize-redux';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import ResultListSkeleton from '../Skeleton/WikipediaSkeleton';


const useStyles = makeStyles({
    resultListRoot: {
        marginRight: isMobile ? 0 : '10vh',
        marginLeft: isMobile ? 0 : '10vh',
        marginTop: isMobile ? '10%' : '2vh'
    },
    pagination: {
        position: isMobile ? '' : 'absolute',
        bottom: '1%',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0
    },
    resultDocsLength: {
        marginLeft: '2%',
        marginTop: '5%',
        alignItems: isMobile ? 'center' : '',
        marginBottom: isMobile ? '10%' : ''
    },
    paginationLogo: {
        width: isMobile ? '15%' : '5%'
    }
});

/**
 * The Result list to show all result items.
 * @param {object} props the given properties.
 * @return {JSX} Result list component.
*/
const ResultList = (props) => {

    // State for current page.
    const [page, setPage] = useState(0);

    const classes = useStyles();

    /**
     * Sets the page state if the user clicks on the next page button.
    */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const { resultDocs, resultDocsLength, searchValue, waiting } = props;

    /**
     * Render the list given the result docs.
     * @param {object} resultDocs the found result documents.
     * @return {JSX} result list.
    */
    const renderList = (resultDocs) => {

        /**
         * Sort the result documents by its PageRank.
         * @param {object} resultDocs the found result documents.
         * @return {JSX} sorted list of resultDocs.
        */
        let resultDocsSortedByPageRank = resultDocs.slice(0);
        resultDocsSortedByPageRank.sort((a, b) => {
            let x = a.pagerank;
            let y = b.pagerank;
            return x < y ? -1 : x > y ? 1 : 0;
        });

        return <Grid
            className={classes.resultListRoot}
            container
            direction='column'
            alignItems={isMobile ? 'center' : 'stretch'}
        >
            {
                waiting
                    ?
                    isMobile ? <ResultListSkeleton /> : null
                    :
                    <Typography className={classes.resultDocsLength} variant="caption">{resultDocsLength} <Translate id='UI__RESULTS_PAGE__RESULT_COUNT' /> "{searchValue}"</Typography>
            }
            <TableBody>
                {
                    waiting
                        ?
                        // show two loading previews
                        [0, 1].map(() => <ResultItem waiting={waiting} />)
                        :
                        resultDocsSortedByPageRank.reverse().map(doc => (
                            <ResultItem key={doc.url} waiting={waiting} website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} level_meta={doc.level_meta} />
                        ))
                            .slice(page * 10, page * 10 + 10)
                }
            </TableBody>
            {
                waiting
                    ?
                    null
                    :
                    <Grid
                        container
                        className={classes.pagination}
                        alignItems='center'
                        direction='column'
                    >
                        <img src={logo} alt="elaisa logo" className={classes.paginationLogo} />
                        <Translate>
                            {({ translate }) => {
                                return (
                                    <TablePagination
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${translate('UI__RESULTS_PAGE__PAGINATION__TEXT')} ${count}`}
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={resultDocsLength}
                                        rowsPerPage={10}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={handleChangePage}
                                    />)
                            }}
                        </Translate>
                    </Grid>
            }
        </Grid>
    }

    return renderList(resultDocs);
}

export default ResultList;
