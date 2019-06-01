import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';

const useToolbarStyles = theme => ({
    root: {
      paddingLeft: "2%",//theme.spacing(2),
      paddingRight: "1%" // theme.spacing(1),
    },
    highlight: {
      color: "grey", //theme.palette.secondary.main,
      backgroundColor: "white" //lighten(theme.palette.secondary.light, 0.85),
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: "red" // theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
  const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
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
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null }
        </div>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

export default EnhancedTableToolbar;