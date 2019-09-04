import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

const headRows = [
    { id: 'searchvalue', numeric: false, disablePadding: true, label: 'UI__USER__PROFILE_PAGE__SEARCH_HISTORY_TABLE__TERM_COLUMN' },
    { id: 'language', numeric: true, disablePadding: false, label: 'UI__USER__PROFILE_PAGE__SEARCH_HISTORY_TABLE__LANG_COLUMN' },
    { id: 'level', numeric: true, disablePadding: false, label: 'UI__USER__PROFILE_PAGE__SEARCH_HISTORY_TABLE__LEVEL_COLUMN' },
    { id: 'date', numeric: true, disablePadding: false, label: 'UI__USER__PROFILE_PAGE__SEARCH_HISTORY_TABLE__DATE_COLUMN' },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headRows.map(row => (
            <TableCell
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}
              >
                <Translate id={row.label} />
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  export default EnhancedTableHead;