import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { SwipeableDrawer, IconButton } from '@material-ui/core/';
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
        // get IOS device information for configuring swipable drawer functionality
        const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
                <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <SideList />
                </SwipeableDrawer>
            </div>
        );
    }
}

export default LeftMenu;