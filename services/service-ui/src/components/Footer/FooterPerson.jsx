import React from 'react';
import { Typography } from "@material-ui/core";

/**
 * Person information component for footer.
 * @param {object} props the given properties.
 * @returns {JSX} the typography styled for person.
*/
const FooterPerson = (props) => (
    <Typography variant="body1" color="textSecondary">
        <b>{props.name}</b><br />
        {props.study} <br />
        {props.faculty} <br />
        {props.uni} <br />
        {props.mail} <br />
    </Typography>
);

export default FooterPerson;