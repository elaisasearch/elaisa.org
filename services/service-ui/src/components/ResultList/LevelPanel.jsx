import React from 'react';
import { Typography, IconButton } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Translate } from 'react-localize-redux';
import LevelInfo from './LevelInfo';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';


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
    expanded: {
        border: '1px solid rgba(0, 0, 0, .125)'
    },
})(MuiExpansionPanel);

/**
 * The design for Expansion Panel Summary for level difficulty infos.
*/
const ExpansionPanelSummary = withStyles({
    root: {
        minHeight: 0,
        '&$expanded': {
            minHeight: 0,
        },
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
    // root: {
    //     padding: 0,
    //     marginTop: "-20px"
    // }
})(MuiExpansionPanelDetails);


/**
 * The Level Panel component for difficulty infos.
 * @param {object} props the given properties.
 * @return {JSX} Expansion Panel component.
*/
const LevelPanel = (props) => (
    <div>
        <ExpansionPanel>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<FitnessCenterIcon fontSize="medium" />}
            >
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: "flex", flexDirection: "column" }}>
                <LevelInfo level_meta={props.level_meta} level={props.level} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
);

export default LevelPanel;