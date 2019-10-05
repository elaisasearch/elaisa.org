import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, IconButton } from '@material-ui/core/';
// Side List for Menu
import SideList from './SideList';

/**
 * The Menu button.
*/
class LeftMenu extends React.Component {

    state = {
        left: false,
        open: false
    };

    /**
     * Set the state for open or close menu.
    */
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
     * Open the drawer.
    */
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    /**
     * Render the Menu button with IconButton.
    */
    render() {
        return (
            <div>
                <IconButton
                    style={{ color: "black" }}
                    aria-label="Open Menu"
                    onClick={this.toggleDrawer('left', true)}
                    id="menuButton"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <SideList />
                </Drawer>
            </div>
        );
    }
}

export default LeftMenu;