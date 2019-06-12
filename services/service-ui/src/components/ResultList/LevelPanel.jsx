import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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
const LevelPanel = (props) => {

    const { A1, A2, B1, B2, C1, C2, unknown, difficulty } = props.level_meta;

    // show difficulty with first letter uppercase
    const firstUpperDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

    /**
     * Return color for difficulty given the difficulty value.
     * @return {string} color.
    */
    const renderDifficulty = () => {
        if (difficulty === "easy") {
            return "green"
        } else {
            return "red"
        }
    }

    return <div style={{ maxWidth: "50vh", marginTop: "-10px" }}>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography component="span">
                    Difficulty
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <Typography>
                        <p><b>Language Level distribution:</b></p>
                        <p>A1: <b>{A1}%</b> | A2: <b>{A2}%</b> | B1: <b>{B1}%</b> | B2: <b>{B2}%</b> | C1: <b>{C1}%</b> | C2: <b>{C2}%</b> | Unknown: <b>{unknown}%</b></p>
                    </Typography>
                </div>
                <div style={{marginTop: "-15px"}}>
                    <Typography component="span">
                        <p style={{ color: "black" }}><b>Word length: </b><b style={{color: renderDifficulty()}}>{firstUpperDifficulty}</b></p>
                    </Typography>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
};

export default LevelPanel;

/*
                <Typography component="span" style={{ color: renderDifficulty() }}>
                    <p style={{color: "black"}}>Word length: </p>{firstUpperDifficulty}
                </Typography>
*/