import React, { useState } from 'react';
import ResultItem from './ResultItem';
import { Typography, TableBody, TablePagination } from '@material-ui/core';
import "../../assets/css/ResultListStyle.css";
import logo from '../../assets/img/logo.png'
import { Translate } from 'react-localize-redux';

/**
 * The Result list to show all result items.
 * @param {object} props the given properties.
 * @return {JSX} Result list component.
*/
const ResultList = (props) => {

    // State for current page.
    const [page, setPage] = useState(0);

    /**
     * Sets the page state if the user clicks on the next page button.
    */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const { resultDocs, resultDocsLength, searchValue } = props;

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

        return <div className="resultListRoot">
            <Typography className="resultDocsLength" variant="caption">{resultDocsLength} <Translate id='UI__RESULTS_PAGE__RESULT_COUNT' /> "{searchValue}"</Typography>
            <TableBody>
                {resultDocsSortedByPageRank.reverse().map(doc => (
                    <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} level={doc.level} level_meta={doc.level_meta} />
                ))
                    .slice(page * 10, page * 10 + 10)
                }
            </TableBody>
            <div id="pagination">
                <img src={logo} alt="elaisa logo" width="5%" />
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
            </div>
        </div>
    }

    return renderList(resultDocs);
}

export default ResultList;
