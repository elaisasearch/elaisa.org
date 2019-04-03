import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '7%',
    marginTop: '4%'
  },
});

class ResultList extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
        const { classes } = this.props;
        return (
          <List className={classes.root}>
            <ResultItem website="www.wdr.de" title="Das Ding | WDR" desc="Hallo was geht heute bei dir denn so ab?"/>
          </List>
        );
    }

}

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
