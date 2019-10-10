import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Popover, Grid } from '@material-ui/core';
import moment from 'moment';
import LevelPanel from './LevelPanel';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/styles';
import LevelInfo from './LevelInfo';

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
        fontSize: ' 12px !important'
    },
    keywords: {
        color: 'blue !important',
        fontSize: '12px !important',
    },
    subtitle: {
        color: 'green !important'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: '16px',
    },
});

/**
 * The Result Item component to show each result.
 * @param {object} props the given properties.
 * @return {JSX} Result item component.
*/
const ResultItem = (props) => {

    const classes = useStyles();
    const { website, title, desc, keywords, date, language, level, level_meta, waiting } = props;

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
                    href={website}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    aria-haspopup="true"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                >
                    {title}
                </a>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <LevelInfo level_meta={level_meta} level={level} />
                </Popover>
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
                    {isMobile ? <LevelPanel level_meta={level_meta} level={level} /> : null}
                </div>
            </div>
        </ListItem>
    )
}

export default ResultItem;