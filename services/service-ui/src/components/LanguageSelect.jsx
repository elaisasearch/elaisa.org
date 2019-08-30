import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';

const LanguageSelect = (props) => {

    const { setActiveLanguage, setUILanguage, uiLanguage} = props;

    const handleChange = (event) => {
        setActiveLanguage(event.target.value);
        setUILanguage(event.target.value);
    }

    return (
        <Select
            disableUnderline
            value={uiLanguage}
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


/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
    return {
      uiLanguage: state.uiLanguage,
    };
  };
  
  /**
   * Maps redux signIn action to props.
   * @param {object} dispatch the current redux store.
   * @returns {any} redux action to props mapping.
  */
  const mapDispatchToProps = dispatch => {
    return {
      setUILanguage: (language) => dispatch({ type: 'SET_UI_LANGUAGE', language })
    };
  };

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(LanguageSelect));