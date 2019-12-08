import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import LevelPanel from './LevelPanel';
import { isMobile } from 'react-device-detect';
import { makeStyles, withTheme } from '@material-ui/styles';

const useStyles = makeStyles({
    levelDiv: theme => ({
        border: '1px solid',
        borderColor: theme.palette.type === 'dark' ? 'rgb(255,255,255,0.3)' : theme.palette.borderColor,
        padding: '1vh',
        borderRadius: '100%',
        marginRight: '2%',
        display: isMobile ? 'none' : '',
        color: theme.palette.text.primary
    }),
    listItemRoot: {
        marginBottom: isMobile ? '5% !important' : '3% !important'
    },
    listItem: {
        padding: '0 !important',
        marginTop: '1%'
    },
    date: {
        fontSize: ' 12px !important'
    },
    keywords: theme => ({
        color: theme.resultItem.keywords.color,
        fontSize: '12px !important',
    }),
    subtitle: {
        color: 'green !important',
        fontSize: ' 12px !important'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        paddingLeft: '16px',
        paddingRight: '16px',
    },
    link: theme => ({
        color: theme.resultItem.link.color
    })
});

/**
 * The Result Item component to show each result.
 * @param {object} props the given properties.
 * @return {JSX} Result item component.
*/
const ResultItem = (props) => {

    const { website, title, desc, keywords, date, language, level, level_meta, waiting, theme } = props;
    const classes = useStyles(theme);

    // hovering state for rendering preview
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <ListItem className={classes.listItemRoot}>
            {!waiting ? <div className={classes.levelDiv}>{level}</div> : null}
            <div>
                <a
                    className={classes.link}
                    href={website}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    aria-haspopup="true"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                >
                    {title}
                </a>
                <ListItemText
                    className={classes.listItem}
                    secondary={
                        <Grid container direction='column'>
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
                        </Grid>
                    }
                />
                <div>
                    <LevelPanel websiteData={{website, title, desc, keywords}} level_meta={level_meta} level={level} language={language} />
                </div>
            </div>
        </ListItem>
    )
}

export default withTheme(ResultItem);