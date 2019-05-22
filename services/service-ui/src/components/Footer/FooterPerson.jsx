import React from 'react';
import { Typography } from "@material-ui/core";

const FooterPerson = (props) => (
    <Typography variant="body1" color="inherit">
        <b>{props.name}</b><br />
        {props.study} <br />
        {props.faculty} <br />
        {props.uni} <br />
        {props.mail} <br />
    </Typography>
);

export default FooterPerson;