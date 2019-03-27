import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LanguageDialog from './LanguageDialog';

const styles = theme => ({
    paper: {
        width: '80%',
        maxHeight: 435,
    },
});

class ResultsLanguageDialog extends React.Component {

    constructor(props) {
        super();
        this.state = {
            open: false,
            value: props.value,
        };
    }

    languageButtonText = "Language of Results";


    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = value => {
        this.setState({ value, open: false });
        this.props.onClose(value);
        this.languageButtonText = `Language: ${value}`;
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    onClick={this.handleClickListItem}
                    variant="contained"
                >
                    {this.languageButtonText}
                </Button>
                <LanguageDialog
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

ResultsLanguageDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsLanguageDialog);
