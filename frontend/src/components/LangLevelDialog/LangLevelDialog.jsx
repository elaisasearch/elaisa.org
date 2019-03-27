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

    constructor(props) {
        super();
        this.state = {
            open: false,
            value: props.value,
        };
    }

    levelButtonText = "Level of speaking";

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = value => {
        this.setState({ value, open: false });
        this.props.onClose(value);
        this.levelButtonText = value === undefined ? "Level of Speaking" : `Level: ${value}`;        ;
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{ margin: "1%" }}>
                <Button
                    onClick={this.handleClickListItem}
                    variant="contained"
                >
                    {this.levelButtonText}
                </Button>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    open={this.state.open}
                    onClose={e => this.handleClose(e)}
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
