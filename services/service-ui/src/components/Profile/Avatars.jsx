import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';
import { Menu, MenuItem, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

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
      return `${props.firstname.slice(0, 1)}${props.lastname.slice(0, 1)}`
    }
    return <Person />
  }

  const renderMenu = (props) => {
    if (props.loggedIn) {
      return <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/profile">Profile</MenuItem>
        <MenuItem component={Link} to="/account">Account</MenuItem>
        <Divider />
        <MenuItem onClick={props.onSignOut} component={Link} to="/">Logout</MenuItem>
      </Menu>
    }
    return <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem component={Link} to="/signin">Sign in</MenuItem>
    </Menu>
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
    {renderMenu(props)}
  </div>

};

// redux action
const mapDispatchToProps = dispatch => {
  return {
      onSignOut: () => dispatch({type: 'SIGN_OUT'})
  };
};

export default connect(null, mapDispatchToProps)(Avatars);
