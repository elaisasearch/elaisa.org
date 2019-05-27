import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, IconButton } from '@material-ui/core/';
// Side List for Menu
import SideList from './SideList';

class LeftMenu extends React.Component {

    state = {
        left: false,
        open: false
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

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
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        <SideList />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default LeftMenu;