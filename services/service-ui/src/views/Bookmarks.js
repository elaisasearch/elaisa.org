import React from 'react';
import NavigationBar from "../components/NavigationBar";
import HeaderTags from '../components/HeaderTags';


/**
 * The Bookmarks view.
 * @returns {JSX} Bookmarks view components jsx.
 */
const Bookmarks = () => (
    <div >
        <HeaderTags
            title="Elaisa Search Engine - Bookmarks"
            desc="Sorry, but there is no page with this path."
            keywords="Bookmarks, Lesezeichen"
        />
        <NavigationBar
            id="navBar"
        />
        <div>

        </div>
    </div>

);

export default Bookmarks;