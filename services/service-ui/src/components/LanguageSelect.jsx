import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withLocalize, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';

const LanguageSelect = (props) => {

    const {currentLanguage, setActiveLanguage} = props;

    const handleChange = (event) => {
        setActiveLanguage(event.target.value);
    }

    return (
        <Select
            value={currentLanguage}
            onChange={handleChange}
            displayEmpty
            name="language"
        >
            <MenuItem value="en-US"><span role='img' aria-label='usa'>🇺🇸</span></MenuItem>
            <MenuItem value='de-DE'><span role='img' aria-label='germany'>🇩🇪</span></MenuItem>
            <MenuItem value='es-ES'><span role='img' aria-label='spain'>🇪🇸</span></MenuItem>
        </Select>
    );
};

const mapStateToProps = state => ({
    currentLanguage: getActiveLanguage(state.localize).code
  });

export default withLocalize(connect(mapStateToProps)(LanguageSelect));