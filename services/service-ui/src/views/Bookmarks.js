import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';
import getBookmarks from '../handlers/bookmarksHelper';
import BookmarkCard from '../components/BookmarkCard';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    bookmarkRoot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '10%'
    }
});


/**
 * The Bookmarks view.
 * @returns {JSX} Bookmarks view components jsx.
 */
const Bookmarks = () => {

    const classes = useStyles();

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
                    bookmarks.map((bm) => {
                        return <BookmarkCard bookmark={bm}/>
                    })
                }
            </div>
        </div>);

};

export default Bookmarks;