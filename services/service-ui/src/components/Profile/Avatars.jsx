import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';

const Avatars = (props) => {

    if (props.email) {
        return <Avatar alt={props.name}>
            <Gravatar email={props.email} />
        </Avatar>
    } else {
        return <Avatar alt={props.name}>
            <Person />
        </Avatar>
    }
};


export default Avatars;
