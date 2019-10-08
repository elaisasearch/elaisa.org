import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Translate } from 'react-localize-redux';
import LevelInfo from './LevelInfo';

/**
 * The design for Expansion Panel for level difficulty infos.
*/
const ExpansionPanel = withStyles({
    root: {
        // border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
        background: "transparent"
    },
    expanded: {},
})(MuiExpansionPanel);

/**
 * The design for Expansion Panel Summary for level difficulty infos.
*/
const ExpansionPanelSummary = withStyles({
    root: {
        padding: 0,
        minHeight: 0
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

/**
 * The design for Expansion Panel Details for level difficulty infos.
*/
const ExpansionPanelDetails = withStyles({
    root: {
        padding: 0,
        marginTop: "-20px"
    },
})(MuiExpansionPanelDetails);


/**
 * The Level Panel component for difficulty infos.
 * @param {object} props the given properties.
 * @return {JSX} Expansion Panel component.
*/
const LevelPanel = (props) => (
    <div style={{ maxWidth: "50vh", marginTop: "-10px" }}>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography component="span">
                    <Translate id='UI__RESULTS_PAGE__DIFFICUTLY__BUTTON' />
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: "flex", flexDirection: "column" }}>
                <LevelInfo level_meta={props.level_meta} level={props.level} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
);

export default LevelPanel;