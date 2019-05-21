import React from "react";
import styles from "../../assets/jss/NotFoundStyle";
import errorPic from "../../assets/img/error.png";
import { Typography } from "@material-ui/core";

const NotFound = (props) => {
    return (
        <div style={styles.root}>
            <img src={errorPic} alt="Error" style={{ width: "20%" }} />
            <Typography variant="h6">
                Sorry, there are no results for "<b>{props.searchValue}</b>" 😔.
                Please try again 🧐.
          </Typography>
            <Typography variant="caption">
                Try to choose another language level than <b>{props.level}</b>
            </Typography>
        </div>
    );
}

export default NotFound;