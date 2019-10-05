import React from 'react';
import { ListItemText, ListItem } from '@material-ui/core/';

/**
 * Link Item for Menu to change view.
 * @param {object} props the given properties.
 * @returns {JSX} the button with 'a' href component.
*/
const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

/**
 * The langauge flag menu item.
 * @param {object} props the given properties.
 * @returns {JSX} ListItemLink for language level test websites.
*/
const MenuHelper = (props) => {
    const { href, text, flag } = props
    return (
        <ListItemLink 
            href={href} 
            target="_blank" 
            style={{
                textAlign: 'center',
                fontSize:'150%' // for flag size
            }}
        >
            {flag} <ListItemText primary={text} />
        </ListItemLink>
    );
}

export default MenuHelper;