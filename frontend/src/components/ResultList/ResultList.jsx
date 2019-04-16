import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ResultItem from './ResultItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import errorPic from '../../assets/img/error.png'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '90%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '5%',
        marginTop: '2%'
    },
    resultDocsLength: {
        martginLeft: '10%',
        marginTop: '2%'
    }
});

class ResultList extends React.Component {

    renderList = (resultDocs, classes) => {

        return <div>
            <Typography style={{marginLeft: '18vh', marginTop: '2vh'}} variant="caption">{`${this.props.resultDocsLength} results`}</Typography>
            <List className={classes.root}>
                {resultDocs.map(doc => (
                <ResultItem website={doc.url} title={doc.title} desc={doc.meta.desc} keywords={doc.meta.keywords} date={doc.meta.date} language={doc.meta.language} />
                ))}
            </List>
        </div>
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

    renderErrorMessage = () => {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            flexDirection: 'column'
        }}>
            <img src={errorPic} alt="Error" style={{width:"20%"}}></img>
            <Typography variant="h6">
                Sorry, there are no results for your search query. Please try again
            </Typography>
        </div>
    }

    render() {
        const { classes } = this.props;

        const { resultDocs, error } = this.props;
        
        if (error) {
            return this.renderErrorMessage()
        }
        else return this.renderList(resultDocs, classes);
    }

}

ResultList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
