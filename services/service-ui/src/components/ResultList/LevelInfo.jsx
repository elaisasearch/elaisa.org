import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Translate } from 'react-localize-redux';

/**
 * The Level Panel component for difficulty infos.
 * @param {object} props the given properties.
 * @return {JSX} Expansion Panel component.
*/
const LevelInfo = (props) => {

    const { A1, A2, B1, B2, C1, C2, unknown, difficulty } = props.level_meta;
    const { level } = props;

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

    return <div>
        <Typography variant='body2' component='span'>
            <p><b><Translate id='UI__DROPDOWN__LEVEL' />:</b> {level}</p>
        </Typography>
        <Typography variant='body2' component='span'>
            <p><b><Translate id='UI__RESULTS_PAGE__DIFFICUTLY__LANGUAGE_LEVEL_DIST' /></b></p>
            <p>A1: <b>{A1}%</b> | A2: <b>{A2}%</b> | B1: <b>{B1}%</b> | B2: <b>{B2}%</b> | C1: <b>{C1}%</b> | C2: <b>{C2}%</b> | <Translate id='UI__RESULTS_PAGE__DIFFICUTLY__UNKNOWN' /> <b>{unknown}%</b></p>
        </Typography>
        <Typography variant='body2' component="span">
            <p><b><Translate id='UI__RESULTS_PAGE__DIFFICUTLY__WORD_LENGTH__TITLE' /> </b><b style={{ color: renderDifficulty() }}>{firstUpperDifficulty}</b></p>
        </Typography>
    </div>
};

export default LevelInfo;