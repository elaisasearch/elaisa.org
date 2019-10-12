import React from 'react';
import '../../assets/css/FooterStyle.css'
import { Typography } from "@material-ui/core";
import FooterPerson from './FooterPerson';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { scrollToFooterContent2 } from '../../handlers/scrollHandler';
import worldmap from '../../assets/img/world-map.svg';
import bubble from '../../assets/img/chat-bubble.svg';
import { Translate } from 'react-localize-redux';

/**
 * The Footer component with legal infos.
*/
const Footer = () => (
    <footer className="footer">


        <div className="content1" id="content1">
            <div className="world-map-content">
                <img src={worldmap} alt="world map" width="50%" />
                <div className="world-map-text">
                    <Typography variant="h4" color="textSecondary" paragraph>
                        <Translate id='UI__FOOTER_ONE__TITLE' />
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textSecondary">
                        <Translate id='UI__FOOTER_ONE__TEXT1' />
                    <br />
                        <br />
                        <Translate id='UI__FOOTER_ONE__TEXT2' />
                    </Typography>
                </div>
            </div>

            <IconButton onClick={e => scrollToFooterContent2()} aria-label="show-footer" id="show-content2-button" size="medium">
                <ArrowDownwardIcon fontSize="large" />
            </IconButton>
        </div>


        <div className="content2" id="content2">
            <div className="languages-content">
                <div className="language-text">
                    <Typography variant="h4" color="textPrimary" paragraph>
                        <Translate id='UI__FOOTER_TWO__TITLE' />
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        <Translate id='UI__FOOTER_TWO__SUBTITLE' />
                    </Typography>
                    <Typography variant="subtitle1">
                        <ul className="link-list">
                            <li><a href="https://www.babbel.com/en/magazine/the-10-most-spoken-languages-in-the-world">What are the 10 most spoken languages</a></li>
                            <li><a href="https://www.italki.com/partners">Find language exchange partners</a></li>
                            <li><a href="https://de.babbel.com/">Learn a language with Babbel</a></li>
                            <li><a href="https://jakubmarian.com/how-to-choose-a-language-to-learn/">How to choose a language to learn</a></li>
                        </ul>
                    </Typography>
                </div>
                <img src={bubble} alt="chat bubbles" width="30%" />
            </div>
        </div>


        <div className="person-info-content">
            <FooterPerson name="Jennifer Gynp" study={<Translate id='UI__FOOTER_PERSON_INSTITUTE' />} faculty={<Translate id='UI__FOOTER_PERSON_FACULTY' />} uni={<Translate id='UI__FOOTER_PERSON_UNI' />} mail="jennifer.gynp@hhu.de" />
            <FooterPerson name="Alexander Teusz" study={<Translate id='UI__FOOTER_PERSON_INSTITUTE' />} faculty={<Translate id='UI__FOOTER_PERSON_FACULTY' />} uni={<Translate id='UI__FOOTER_PERSON_UNI' />} mail="alexander.teusz@hhu.de" />
            <FooterPerson name="Paula Leberer" study={<Translate id='UI__FOOTER_PERSON_INSTITUTE' />} faculty={<Translate id='UI__FOOTER_PERSON_FACULTY' />} uni={<Translate id='UI__FOOTER_PERSON_UNI' />} mail="paula.leberer@hhu.de" />
        </div>
        <div className="legal">
            <Typography variant="caption" color='textPrimary'>
                <Translate id='UI__FOOTER_LEGAL' />
            </Typography>
        </div>
    </footer>
);

export default Footer;