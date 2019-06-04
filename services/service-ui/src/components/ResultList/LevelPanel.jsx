import React from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import {Divider} from '@material-ui/core';

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


const LevelPanel = (props) => {

    const { A1, A2, B1, B2, C1, C2, unknown, difficulty } = props.level_meta;

    // show difficulty with first letter uppercase
    const firstUpperDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

    const renderDifficulty = () => {
        if (difficulty === "easy") {
            return "green"
        } else {
            return "red"
        }
    }

    return <div style={{ maxWidth: "20vh", marginTop: "-10px" }}>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography component="span" style={{color: renderDifficulty()}}>
                    {firstUpperDifficulty}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    <p>A1: <b style={{marginLeft: "4em"}}>{A1}%</b></p>
                    <Divider />
                    <p>A2: <b style={{marginLeft: "4em"}}>{A2}%</b></p>
                    <Divider />
                    <p>B1: <b style={{marginLeft: "4em"}}>{B1}%</b></p>
                    <Divider />
                    <p>B2: <b style={{marginLeft: "4em"}}>{B2}%</b></p>
                    <Divider />
                    <p>C1: <b style={{marginLeft: "4em"}}>{C1}%</b></p>
                    <Divider />
                    <p>C2: <b style={{marginLeft: "4em"}}>{C2}%</b></p>
                    <Divider />
                    <p>Unknown: <b style={{marginLeft: "1em"}}>{unknown}%</b></p>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
};

export default LevelPanel;