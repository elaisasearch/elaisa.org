import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import { renderToStaticMarkup } from "react-dom/server";

// import translations and language information
import enUSTranslations from '../assets/translations/en-US.translations.json';
import deDETranslations from '../assets/translations/de-DE.translations.json';
import esESTranslations from '../assets/translations/es-ES.translations.json'
import languages, { enUS, deDE, esES } from '../lib/languageCodes';


const onMissingTranslation = ({ defaultTranslation }) => defaultTranslation;

class LanguageSelect extends Component {

    constructor(props) {
        super(props);

        const { initialize, addTranslationForLanguage, setActiveLanguage, onSetUILanguage } = this.props;

        const defaultLanguage = languages[0].code;

        initialize({
			languages,
			options: {
                renderToStaticMarkup,
				ignoreTranslateChildren: true,
				onMissingTranslation: onMissingTranslation
			}
        });
        

		addTranslationForLanguage(enUSTranslations, enUS);
		addTranslationForLanguage(deDETranslations, deDE);
		addTranslationForLanguage(esESTranslations, esES)

		setActiveLanguage(defaultLanguage);
		onSetUILanguage(defaultLanguage);
    }


    handleChange = (event) => {
        const { setActiveLanguage, onSetUILanguage } = this.props;
        setActiveLanguage(event.target.value);
        onSetUILanguage(event.target.value);
    }

    render() {
        // redux
        const { uiLanguage } = this.props;
        return (
            <Select
                value={uiLanguage}
                onChange={this.handleChange}
                displayEmpty
                name="language"
            >
                <MenuItem value="en-US">
                    <span role='img' aria-label='usa'>🇺🇸</span>
                </MenuItem>
                <MenuItem value='de-DE'><span role='img' aria-label='germany'>🇩🇪</span></MenuItem>
                <MenuItem value='es-ES'><span role='img' aria-label='spain'>🇪🇸</span></MenuItem>
            </Select>
        );
    }

};

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
    return {
      uiLanguage: state.uiLanguage
    };
  };

/**
 * Maps redux signIn action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
    return {
      onSetUILanguage: (language) => dispatch({ type: 'SET_UI_LANGUAGE', language })
    };
  };

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(LanguageSelect));



// export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
