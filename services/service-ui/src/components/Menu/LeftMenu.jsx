import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { SwipeableDrawer, IconButton } from '@material-ui/core/';
// Side List for Menu
import SideList from './SideList';
import { withTheme } from '@material-ui/styles'; 

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
        const { theme } = this.props;

        return (
            <div>
                <IconButton
                    style={
                        { 
                            color: theme.palette.text.secondary
                        }
                    }
                    aria-label="Open Menu"
                    onClick={this.toggleDrawer('left', true)}
                    id="menuButton"
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={this.state.left} onOpen={this.toggleDrawer('left', true)} onClose={this.toggleDrawer('left', false)}>
                    <SideList />
                </SwipeableDrawer>
            </div>
        );
    }
}

export default withTheme(LeftMenu);