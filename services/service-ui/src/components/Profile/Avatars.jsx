import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import '../../assets/css/AvatarStyle.css';

const Avatars = (props) => (
    <Avatar alt={props.name} src={props.image} className="avatar" />
);

export default Avatars;
