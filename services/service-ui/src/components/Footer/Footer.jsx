import React from 'react';
import '../../assets/css/FooterStyle.css'
import { Typography } from "@material-ui/core";
import FooterPerson from './FooterPerson';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { default as scrollToFooterContent2 } from '../../handlers/scrollHandler';
import worldmap from '../../assets/img/world-map.svg';
import bubble from '../../assets/img/chat-bubble.svg';

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
                        Discover the world of languages with Elaisa
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textSecondary">
                        Learning a new language is always a big challenge, but it can be a bit easier - with Elaisa.
                        As is known, a language can only be mastered if it is used regularly, ie it is used in a conversation or for reading appropriate literature. The problem with conventional learning materials is the outdated state of the respective texts.
                        Textbooks often develop their own stories to explain the various topics of a conversation by means of self-contained stories. Unfortunately, this has nothing to do with actuality.
                    <br />
                        <br />
                        Therefore, Elaisa provides the functionality to search for current articles and websites of a desired language. The own language level can be specified directly in order to keep or even expand one's own level of knowledge.
                    </Typography>
                </div>
            </div>

            <IconButton onClick={e => scrollToFooterContent2()} aria-label="show-footer" id="show-content2-button" size="large">
                <ArrowDownwardIcon fontSize="large" />
            </IconButton>
        </div>


        <div className="content2" id="content2">
            <div className="languages-content">
                <div className="language-text">
                    <Typography variant="h4" color="textPrimary" paragraph>
                        Helpful Links
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        We've listed a few helpful links so you can easily find your dream language.
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