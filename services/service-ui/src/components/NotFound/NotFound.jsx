import React from "react";
import errorPic from "../../assets/img/error.png";
import { Typography } from "@material-ui/core";
import { Button } from '@material-ui/core';
import '../../assets/css/NotFoundStyle.css'
import { Translate } from 'react-localize-redux';

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
                <Button className='spelling' onClick={onClickSpellCheck}>
                    <Typography variant="caption" color="primary">
                        <Translate id='UI__NOT_FOUND_PAGE__CORRECTION' /> "<b>{correctSpelledQuery}</b>?".
                    </Typography>
                </Button>
                <div className='notFound'>
                    <img src={errorPic} alt="Error" id='notfoundimage'/>
                    <Typography variant="h6" id='notfoundtitle'>
                        <Translate id='UI__NOT_FOUND_PAGE__TITLE_ONE' /> "<b>{searchValue}</b>" 😔. <Translate id='UI__NOT_FOUND_PAGE__TITLE_TWO' /> 🧐.
                    </Typography>
                    <Typography variant="caption">
                        <Translate id='UI__NOT_FOUND_PAGE__ADVICE_ONE' /> <b>{level}</b> <Translate id='UI__NOT_FOUND_PAGE__ADVICE_TWO' /> <b>{language.toUpperCase()}</b>
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className='notFound'>
            <img src={errorPic} alt="Error" id='notfoundimage' />
            <Typography variant="h6" id='notfoundtitle'>
                <Translate id='UI__NOT_FOUND_PAGE__TITLE_ONE' /> "<b>{searchValue}</b>" 😔. <Translate id='UI__NOT_FOUND_PAGE__TITLE_TWO' /> 🧐.
          </Typography>
            <Typography variant="caption">
                <Translate id='UI__NOT_FOUND_PAGE__ADVICE_ONE' /> <b>{level}</b> <Translate id='UI__NOT_FOUND_PAGE__ADVICE_TWO' /> <b>{language.toUpperCase()}</b>
            </Typography>
        </div>
    );
}

export default NotFound;