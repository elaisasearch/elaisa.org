import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';
import getBookmarks from '../handlers/bookmarksHelper';
import BookmarkCard from '../components/BookmarkCard';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Divider, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { Translate } from 'react-localize-redux';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    bookmarkRoot: {
        display: 'flex',
        flex: 1,
        alignItems: isMobile ? 'center' : null,
        flexDirection: isMobile ? 'column' : 'row',
        marginTop: isMobile ? '10%' : '5%',
        justifyContent: isMobile ? null : 'space-around',
        flexFlow: isMobile ? null : 'wrap'
    },
    bookmarkicon: {
        fontSize: isMobile ? '100vw !important' : '50vw !important',
        color: 'rgb(0, 0, 0, 0.1)',
        position: !isMobile ? 'fixed' : null,
        marginTop: '-5%'
    },
    tabRoot: {
        fontSize: '30px !important'
    },
    tabsCentered: {
        justifyContent: 'space-around !important'
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        borderTop: isMobile ? '1px solid #e8e8e8' : null,
    },
    tabsIndicator: {

    },
    levelTabs: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100%'
      },
    tabs: {
        borderRight: `1px solid #e8e8e8`
    },
    levelTabPanel: {
        flex: 1
    },
    levelTabRoot: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    }
});


/**
 * The Bookmarks view.
 * @returns {JSX} Bookmarks view components jsx.
 */
const Bookmarks = () => {

    const classes = useStyles();

    const [deleted, setDeleted] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [levelTab, setLevelTab] = React.useState(0)

    // get bookmark articles
    let bookmarks = getBookmarks();

    // re-render page after bookmark was deleted
    React.useEffect(() => {
        setDeleted(false)
    }, [deleted])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    /**
     * Store the new tab in the state
     * @param {Event} event 
     * @param {Number} newValue 
     */
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    /**
     * Store the new level tab in the state
     * @param {Event} event 
     * @param {Number} newValue 
     */
    const handleChangeLevelTab = (event, newValue) => {
        setLevelTab(newValue);
    }

    /**
     * Render the bookmarks for each language
     * @param {String} lang 
     */
    const renderTabContent = (lang, level) => {
        return (
            <div className={classes.bookmarkRoot}>
                {
                    bookmarks[lang].length === 0
                        ?
                        <BookmarkIcon className={classes.bookmarkicon} />
                        :
                        bookmarks[lang].map((bm, index) => {
                            if (bm.level === level) {
                                return <BookmarkCard key={index} bookmark={bm} setDeleted={setDeleted} />
                            } else if (level === 'All') {
                                return <BookmarkCard key={index} bookmark={bm} setDeleted={setDeleted} />
                            } else {
                                return <div></div>
                            }
                        })
                }
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <HeaderTags
                title="Elaisa Search Engine - Bookmarks"
                desc="Sorry, but there is no page with this path."
                keywords="Bookmarks, Lesezeichen"
            />
            <NavigationBar
                id="navBar"
            />
            {isMobile ? <br /> : <Divider />}
            <Tabs
                centered
                value={tab}
                onChange={handleChangeTab}
                aria-label="bookmarks tabs"
                indicatorColor='secondary'
                classes={{
                    centered: classes.tabsCentered,
                    root: classes.tabsRoot,
                    indicator: classes.tabsIndicator
                }}
            >
                <Tab classes={{ root: classes.tabRoot }} label="🇩🇪" {...a11yProps(0)} />
                <Tab classes={{ root: classes.tabRoot }} label="🇬🇧" {...a11yProps(1)} />
                <Tab classes={{ root: classes.tabRoot }} label="🇪🇸" {...a11yProps(2)} />
            </Tabs>
            {
                ['de', 'en', 'es'].map((langCode, index) => (
                    <TabPanel key={index} value={tab} index={index}>
                        <div className={classes.levelTabs}>
                            <Tabs
                                orientation={isMobile ? 'horizontal' : 'vertical'}
                                centered
                                variant="scrollable"
                                value={levelTab}
                                onChange={handleChangeLevelTab}
                                aria-label="Vertical tabs for language level"
                                className={classes.tabs}
                            >
                                <Tab classes={{ root: classes.levelTabRoot }} label={<Translate id='UI__DROPDOWN__LEVEL_ALL' />} {...a11yProps(0)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="A1" {...a11yProps(1)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="A2" {...a11yProps(2)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="B1" {...a11yProps(3)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="B2" {...a11yProps(4)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="C1" {...a11yProps(5)} />
                                <Tab classes={{ root: classes.levelTabRoot }} label="C2" {...a11yProps(6)} />
                            </Tabs>
                            {
                                ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, i) => (
                                    <TabPanel key={i} className={classes.levelTabPanel} value={levelTab} index={i}>
                                        {renderTabContent(langCode, level)}
                                    </TabPanel>
                                ))
                            }
                        </div>
                    </TabPanel>
                ))
            }
        </div>);

};

export default Bookmarks;