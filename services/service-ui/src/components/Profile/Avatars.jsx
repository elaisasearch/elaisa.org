import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';

import '../../assets/css/AvatarStyle.css';

const Avatars = (props) => (
    <Avatar alt={props.name} className="avatar">
        <Gravatar email={props.email} />
    </Avatar>
);

export default Avatars;
