import React from "react";
import styles from "../../assets/jss/NotFoundStyle";
import errorPic from "../../assets/img/error.png";
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core';

/**
 * The not found component for the Results view.
 * @param {object} props the given properties
 * @returns {JSX} Error text and image.
*/
const NotFound = (props) => {

    const { searchValue, level, language, correctSpelledQuery, onClickSpellCheck } = props;

    if (correctSpelledQuery.length > 0) {
        return (
            <div>
                <Button style={styles.spelling} onClick={onClickSpellCheck}>
                    <Typography variant="caption" color="primary">
                        Did you mean "<b>{correctSpelledQuery}</b>?".
                    </Typography>
                </Button>
                <div style={styles.notFound}>
                    <img src={errorPic} alt="Error" style={{ width: "20%" }} />
                    <Typography variant="h6">
                        Sorry, there are no results for "<b>{searchValue}</b>" 😔.
                        Please try again 🧐.
                    </Typography>
                    <Typography variant="caption">
                        Try to choose another level than <b>{level}</b> or another language than <b>{language.toUpperCase()}</b>
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.notFound}>
            <img src={errorPic} alt="Error" style={{ width: "20%" }} />
            <Typography variant="h6">
                Sorry, there are no results for "<b>{searchValue}</b>" 😔.
                Please try again 🧐.
          </Typography>
            <Typography variant="caption">
                Try to choose another level than <b>{level}</b> or another language than <b>{language.toUpperCase()}</b>
            </Typography>
        </div>
    );
}

export default NotFound;