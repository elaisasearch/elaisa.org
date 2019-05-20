import React, { Component } from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader } from '@material-ui/core/';
import { Share, ExpandLess, ExpandMore, Home } from '@material-ui/icons/';
import styles from '../../assets/jss/MenuStyle';
import MenuHelper from './MenuHelper';
import Switch from './Switch';

// import language flags for menu
import german from '../../assets/img/menu_flags/german.jpg';
import english from '../../assets/img/menu_flags/english.jpg';
import spanish from '../../assets/img/menu_flags/spanish.jpg';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class SideList extends Component {

    state = {
        open: false
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        return (
            <div style={styles.list}>
                <List
                    component="nav"
                    style={styles.list}
                    subheader={<ListSubheader component="nav">Menu</ListSubheader>}
                >
                    {/* Home */}
                    <ListItemLink href="/" >
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
                            {/* <MenuHelper href="https://sprachtest.de/einstufungstest-franzoesisch" flag={french} style={style.nested} text="Français" /> */}
                            <MenuHelper href="https://sprachtest.de/einstufungstest-spanisch" flag={spanish} style={styles.nested} text="Español" />
                            {/* <MenuHelper href="https://sprachtest.de/einstufungstest-italienisch" flag={italian} style={style.nested} text="Italiano" /> */}
                            <Divider />
                        </List>
                    </Collapse>
                    {/* Home */}
                    <ListItem>
                        <Switch />
                        <ListItemText inset primary="Darkmode" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default SideList;