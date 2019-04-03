import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5%',
        marginTop: '2%'
    },
});

class ResultList extends React.Component {

    constructor(props) {
        super(props)
    }

    renderList = (resultDocs, classes) => {
        return <List className={classes.root}>
            {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} />
            ))}
        </List>
    }

    renderProgress = (value) => {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh'
        }}>
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
        const { classes } = this.props;

        const { resultDocs } = this.props;

        return this.renderList(resultDocs, classes);
    }

}

ResultList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
