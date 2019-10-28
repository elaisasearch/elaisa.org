import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';
import getBookmarks from '../handlers/bookmarksHelper';
import BookmarkCard from '../components/BookmarkCard';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    bookmarkRoot: {
        display: 'flex',
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
    }
});


/**
 * The Bookmarks view.
 * @returns {JSX} Bookmarks view components jsx.
 */
const Bookmarks = () => {

    const classes = useStyles();

    const [deleted, setDeleted] = React.useState(false);

    // get bookmark articles
    let bookmarks = getBookmarks();

    // re-render page after bookmark was deleted
    React.useEffect(() => {
        setDeleted(false)
    }, [deleted])

    return (
        <div>
            <HeaderTags
                title="Elaisa Search Engine - Bookmarks"
                desc="Sorry, but there is no page with this path."
                keywords="Bookmarks, Lesezeichen"
            />
            <NavigationBar
                id="navBar"
            />
            {!isMobile ? <Divider /> : null}
            <div className={classes.bookmarkRoot}>
                {
                    bookmarks.length === 0
                        ?
                        <BookmarkIcon className={classes.bookmarkicon} />
                        :
                        bookmarks.map((bm, index) => {
                            return <BookmarkCard key={index} bookmark={bm} setDeleted={setDeleted} />
                        })
                }
            </div>
        </div>);

};

export default Bookmarks;