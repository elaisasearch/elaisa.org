import React from 'react';
import '../../assets/css/FooterStyle.css'
import { Typography } from "@material-ui/core";
import FooterPerson from './FooterPerson';

const Footer = () => (
    <footer className="footer">
        <div className="content">
            <FooterPerson name="Jennifer Gynp" study="Information Science" faculty="Faculty of Arts and Humanities" uni="Heinrich-Heine-University Düsseldorf" mail="jennifer.gynp@hhu.de" />
            <FooterPerson name="Alexander Teusz" study="Information Science" faculty="Faculty of Arts and Humanities" uni="Heinrich-Heine-University Düsseldorf" mail="alexander.teusz@hhu.de" />
            <FooterPerson name="Paula Leberer" study="Information Science" faculty="Faculty of Arts and Humanities" uni="Heinrich-Heine-University Düsseldorf" mail="paula.leberer@hhu.de" />
        </div>
        <div className="legal">
            <Typography variant="caption" color="default">
                Elaisa - Language Level Search Engine - All rights reserved - 2019
            </Typography>
        </div>
    </footer>
);

export default Footer;