import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person, ExitToApp, Home, Dashboard } from '@material-ui/icons/';
import { Menu, MenuItem, Button, Divider, ListItemIcon, ListItemText} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../assets/css/AvatarsStyle.css';
import { Translate } from 'react-localize-redux';

/**
 * The Avatar component for Navigation bar.
 * @param {object} props the given properties.
 * @returns {JSX} the button avatar for profile picture.
*/
const Avatars = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  /**
   * Change anchor and open menu.
   * @param {object} event the click event.
  */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  /**
   * Change anchor and close menu.
  */
  const handleClose = () => {
    setAnchorEl(null);
  }

  /**
   * Get avatar from Gravatar.com.
   * @param {object} props the given properties.
   * @returns {JSX} render avatar icon given if the user is logged in or not.
  */
  const renderAvatar = (props) => {
    if (props.email) {
      return <Gravatar email={props.email} />
    } else if (props.firstname && props.lastname) {
      return `${props.firstname.slice(0, 1)}${props.lastname.slice(0, 1)}`
    }
    return <Person />
  }

  /**
   * Avatar menu with profile options.
   * @param {object} props the given properties.
   * @returns {JSX} render profile menu given if the user is logged in or not. Wether signIn or view profile stats and options.
  */
  const renderMenu = (props) => {
    if (props.loggedIn) {
      return <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem component={Link} to="/profile">
        <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={<Translate id='UI__USER__MENU__PROFILE' />} />
        </MenuItem>
        <MenuItem component={Link} to="/account">
        <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={<Translate id='UI__USER__MENU__ACCOUNT' />} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={props.onSignOut} component={Link} to="/">
        <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={<Translate id='UI__USER__MENU__SIGN_OUT' />} />
        </MenuItem>
      </Menu>
    }
    return <Menu 
      id="simple-menu" 
      anchorEl={anchorEl} 
      open={Boolean(anchorEl)} 
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      getContentAnchorEl={null}
    >
      <MenuItem component={Link} to="/signin">
      <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={<Translate id='UI__BUTTION__SIGN_IN' />} />
      </MenuItem>
    </Menu>
  }

  return <div className="avatarButton">
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

/**
 * Maps redux signOut action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
  return {
      onSignOut: () => dispatch({type: 'SIGN_OUT'})
  };
};

export default connect(null, mapDispatchToProps)(Avatars);
