import React from 'react';
import {ListItemText, ListItem} from '@material-ui/core/';

// Links for Menu
const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const MenuHelper = (props) => {
    const { href, style, text, flag} = props
    return (
        <ListItemLink href={href} style={style}>
            <img src={flag} style={{width:"10%"}}></img>
            <ListItemText primary={text} />
        </ListItemLink>
    );
}

export default MenuHelper;