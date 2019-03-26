import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ConfirmationDialogRaw from './ConfirmationDialogRaw';

const styles = theme => ({
    paper: {
        width: '80%',
        maxHeight: 435,
    },
});

class LangLevelDialog extends React.Component {
    state = {
        open: false,
        value: 'Dione',
    };

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = value => {
        this.setState({ value, open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{margin:"1%"}}>
                <Button
                    onClick={this.handleClickListItem}
                    variant="contained"
                >
                    Language Level
                </Button>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    value={this.state.value}
                />
            </div>
        );
    }
}

LangLevelDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LangLevelDialog);
