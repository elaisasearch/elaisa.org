import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import LevelPanel from './LevelPanel';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    levelDiv: {
        border: '1px solid black',
        padding: '1vh',
        borderRadius: '100%',
        marginRight: '2%',
        display: isMobile ? 'none' : ''
    },
    listItemRoot: {
        marginBottom: isMobile ? '5% !important' : '1% !important'
    },
    listItem: {
        padding: '0 !important',
        marginTop: '1%'
    },
    date: {
        fontSize:' 12px !important'
    },
    keywords: {
        color: 'blue !important',
        fontSize: '12px !important',
    }, 
    subtitle: {
        color: 'green !important'
    }
});

/**
 * The Result Item component to show each result.
 * @param {object} props the given properties.
 * @return {JSX} Result item component.
*/
const ResultItem = (props) => {

    const classes = useStyles();
    const { website, title, desc, keywords, date, language, level, level_meta } = props;

    /**
     * Result Item Title.
     * @return {JSX} title with link to article.
    */
    const Title = () => {
        return <a href={website}>{title}</a>
    }

    return (
        <ListItem className={classes.listItemRoot}>
            <div className={classes.levelDiv}>{level}</div>
            <div>
                <Title />
                <ListItemText
                    className={classes.listItem}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" className={classes.date}>
                                {/* TODO: only shows the english date */}
                                {moment(date).locale(language).format('LLLL') === "Invalid date" ? "" : moment(date).locale(language).format('LLL')}
                            </Typography>
                            <Typography component="span" className={classes.subtitle}>
                                {website}
                            </Typography>
                            {desc}
                            <Typography component="span" className={classes.keywords}>
                                {keywords}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <div>
                    <LevelPanel level_meta={level_meta} />
                </div>
            </div>
        </ListItem>
    )
}

export default ResultItem;