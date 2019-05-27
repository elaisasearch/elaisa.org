import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';
import { Menu, MenuItem, Button } from '@material-ui/core';

const Avatars = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const renderAvatar = (props) => {
    if (props.email) {
      return <Gravatar email={props.email} />
    } else if (props.firstname && props.lastname) {
      return `${props.firstname.slice(0,1)}${props.lastname.slice(0,1)}`
    }
    return <Person />  
  }

  return <div>
    <Button
      aria-owns={anchorEl ? 'simple-menu' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <Avatar onClick={handleClick} alt={props.name}>
        {renderAvatar(props)}
      </Avatar>
    </Button>
    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  </div>

};


export default Avatars;
