import React from 'react';
import { Typography } from "@material-ui/core";
import NavigationBar from "../components/NavigiationBar/NavigationBar";
import styles from '../assets/jss/Page404Style';

/**
 * The Page404 view.
 * @returns {JSX} Page404 view components jsx.
 */
const Page404 = () => (
    <div >
        <NavigationBar
            id="navBar"
        />
        <div style={styles.root}>
            <Typography style={styles.typo} variant="h3">
                404 Page not found
        </Typography>
            <Typography style={styles.typo} variant="title">
                Sorry, but I can't find this page.
          </Typography>
            <div style={styles.gif}>
                <iframe src="https://giphy.com/embed/6uGhT1O4sxpi8" style={styles.iFrame} frameBorder="0" title="Not found"></iframe>
            </div>
        </div>
    </div>

);

export default Page404;