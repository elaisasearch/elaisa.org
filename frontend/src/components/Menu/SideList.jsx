import React, { Component } from 'react';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader } from '@material-ui/core/';
import { Share, ExpandLess, ExpandMore, Home } from '@material-ui/icons/';
import style from '../../assets/jss/MenuStyle';
import MenuHelper from './MenuHelper';

// import language flags for menu
import german from '../../assets/img/menu_flags/german.jpg';
import english from '../../assets/img/menu_flags/english.jpg';
import spanish from '../../assets/img/menu_flags/spanish.jpg';
import french from '../../assets/img/menu_flags/french.jpg';
import italian from '../../assets/img/menu_flags/italian.jpg';

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
            <div className={style.list}>
                <List
                    component="nav"
                    style={{maxWidth: "25vh"}}
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
                            <MenuHelper href="https://github.com/AlexTeusz" flag={german} style={style.nested} text="Deutsch" />
                            <MenuHelper href="https://twitter.com/AlexTeusz" flag={english} style={style.nested} text="English" />
                            <MenuHelper href="https://www.facebook.com/alex.teusz?ref=bookmarks" flag={french} style={style.nested} text="Français" />
                            <MenuHelper href="https://www.instagram.com/alexteusz/" flag={spanish} style={style.nested} text="Español" />
                            <MenuHelper href="https://www.linkedin.com/in/alexander-teusz-7b1312153/" flag={italian} style={style.nested} text="Italiano" />
                            <Divider />
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default SideList;