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
    marginTop: '2%'
  },
});

class ResultList extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
        const { classes } = this.props;

        const { resultDocs } = this.props;

        return (
          <List className={classes.root}>
            {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language}/>
            ))}
          </List>
        );
    }

}

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
