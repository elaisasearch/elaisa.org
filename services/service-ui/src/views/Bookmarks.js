import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';
import getBookmarks from '../handlers/bookmarksHelper';
import BookmarkCard from '../components/BookmarkCard';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
    bookmarkRoot: {
        display: 'flex',
        alignItems: isMobile ? 'center' : null,
        flexDirection: isMobile ? 'column' : 'row',
        marginTop: isMobile ? '10%' : '5%',
        justifyContent: isMobile ? null : 'space-around'
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
            <div className={classes.bookmarkRoot}>
                {
                    bookmarks.map((bm, index) => {
                        return <BookmarkCard key={index} bookmark={bm} setDeleted={setDeleted}/>
                    })
                }
            </div>
        </div>);

};

export default Bookmarks;