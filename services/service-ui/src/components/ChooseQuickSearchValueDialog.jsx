import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Translate } from 'react-localize-redux';

const ChooseQuickSearchValueDialog = (props) => {

    const { onClose, open, topics } = props;

    const handleClose = () => {
        onClose('', false);
    };

    const handleListItemClick = value => {
        onClose(value, true);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title"><Translate id='UI__DIALOG__QUICK_SEARCH' /></DialogTitle>
            <List>
                {topics.map(topic => (
                    <ListItem button onClick={() => handleListItemClick(topic)} key={topic}>
                        <ListItemText primary={topic} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

ChooseQuickSearchValueDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default ChooseQuickSearchValueDialog;
