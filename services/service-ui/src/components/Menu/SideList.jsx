import React, { Component } from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader } from '@material-ui/core/';
import { Share, ExpandLess, ExpandMore, Home } from '@material-ui/icons/';
import styles from '../../assets/jss/MenuStyle';
import MenuHelper from './MenuHelper';
import { Link } from 'react-router-dom'

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
        open: false
    }

    /**
     * Set the state for open or close the list in the menu drawer.
    */
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

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
                        <ListItemText inset primary="Home" />
                    </ListItemLink>
                    {/* Level of Speaking Tests MENU */}
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <Share />
                        </ListItemIcon>
                        <ListItemText inset primary="Speaking Tests" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
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

export default SideList;