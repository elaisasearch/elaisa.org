import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const useToolbarStyles = {
  root: {
    paddingLeft: "2%",
    paddingRight: "1%"
  },
  highlight: {
    color: "lightred",
    backgroundColor: "lightred"
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: "red"
  },
  title: {
    flex: '0 0 auto',
  },
};

const EnhancedTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar
      style={numSelected > 0 ? useToolbarStyles.highlight : useToolbarStyles.root}
    >
      <div style={useToolbarStyles.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {props.title}
            </Typography>
          )}
      </div>
      <div style={useToolbarStyles.spacer} />
      <div style={useToolbarStyles.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;