import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import '../../assets/css/PaginationStyle.css';

const Pagination = (props) => {

    const { resultLength } = props;

    // State for current page.
    const [page, setPage] = useState(0);

    /**
     * Sets the page state if the user clicks on the next page button.
    */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    return (
        <div id="pagination">
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={resultLength}
                rowsPerPage={10}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
            />
        </div>
    )
}

export default Pagination;