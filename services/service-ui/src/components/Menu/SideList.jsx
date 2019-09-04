import React, { Component } from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader } from '@material-ui/core/';
import { Help, Share, ExpandLess, ExpandMore, Home } from '@material-ui/icons/';
import styles from '../../assets/jss/MenuStyle';
import MenuHelper from './MenuHelper';
import { Link } from 'react-router-dom'
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';

// import language flags for menu
import german from '../../assets/img/menu_flags/german.jpg';
import english from '../../assets/img/menu_flags/english.jpg';
import spanish from '../../assets/img/menu_flags/spanish.jpg';

/**
 * Link Item for Menu to change view.
 * @param {object} props the given properties.
 * @returns {JSX} the button with 'a' href component.
*/
const ListItemLink = (props) => {
    return <ListItem button component={Link} {...props} />;
}

class SideList extends Component {

    state = {
        open: false,
        splashDialogOpen: false
    }
    

    /**
     * Set the state for open or close the list in the menu drawer.
    */
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
     * Handle opening and closing for the help splash dialog component
     */
    handleOpenSplashDialog = () => {
        localStorage.setItem('splashDialogWasOpen', false)
        this.props.onOpenedSplashDialog(false)
    }

    /**
     * Renders the menu list with all items.
     * @returns {JSX} the entire menu list with all items.
    */
    render() {
        return (
            <div style={styles.list}>
                <List
                    component="nav"
                    style={{ maxWidth: "25vh" }}
                    subheader={<ListSubheader component="nav">Menu</ListSubheader>}
                >
                    {/* Home */}
                    <ListItemLink to="/" >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText inset primary={<Translate id='UI__MENU__HOME_BUTTON' />} />
                    </ListItemLink>
                    {/* Level of Speaking Tests MENU */}
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <Share />
                        </ListItemIcon>
                        <ListItemText inset primary={<Translate id='UI__MENU__SPEAKING_TESTS_BUTTON' />} />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    {/* Show Splash Dialog as Help view */}
                    <ListItemLink to='/' onClick={() => this.handleOpenSplashDialog()}>
                        <ListItemIcon>
                            <Help />
                        </ListItemIcon>
                        <ListItemText inset primary={<Translate id='UI__MENU__HELP_BUTTON' />} />
                    </ListItemLink>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <MenuHelper href="https://sprachtest.de/einstufungstest-deutsch" flag={german} style={styles.nested} text="Deutsch" />
                            <MenuHelper href="https://sprachtest.de/einstufungstest-englisch" flag={english} style={styles.nested} text="English" />
                            <MenuHelper href="https://sprachtest.de/einstufungstest-spanisch" flag={spanish} style={styles.nested} text="Español" />
                            <Divider />
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
    return {
      splashDialogWasOpen: state.splashDialogWasOpen
    };
  };
  
  /**
   * Maps redux signIn action to props.
   * @param {object} dispatch the current redux store.
   * @returns {any} redux action to props mapping.
  */
  const mapDispatchToProps = dispatch => {
    return {
      onOpenedSplashDialog: (opened) => dispatch({ type: 'OPENED_SPLASH', opened})
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(SideList);