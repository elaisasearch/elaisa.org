import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';

import enUSTranslations from './assets/translations/en-US.translations.json';
import deDETranslations from './assets/translations/de-DE.translations.json';
import esESTranslations from './assets/translations/es-ES.translations.json'
import languages, { enUS, deDE, esES } from './lib/languageCodes';

import App from './views/App';

const onMissingTranslation = ({ defaultTranslation }) => defaultTranslation;

const validateLanguage = (languageCode) => {
    let langCodeIsValid = false;
    languages.forEach(lang => {
        if (lang.code === languageCode) langCodeIsValid = true;
    })
    return langCodeIsValid;
};

class TranslationWrapper extends React.Component {
    constructor(props) {
        super(props);

        const { initialize, addTranslationForLanguage, setActiveLanguage, setUILanguage } = this.props;

        const localStorageLanguage = localStorage.getItem("languageCode");

        const defaultLanguage =
            validateLanguage(localStorageLanguage) ? localStorageLanguage : languages[0].code;

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
        setUILanguage(defaultLanguage)
    }

    componentDidUpdate(prevProps) {

        const { setUILanguage } = this.props;

        const prevLangCode =
            prevProps.activeLanguage && prevProps.activeLanguage.code;
        const curLangCode =
            this.props.activeLanguage && this.props.activeLanguage.code;

        const hasLanguageChanged = prevLangCode !== curLangCode;

        if (hasLanguageChanged && validateLanguage(curLangCode)) {
            localStorage.setItem("languageCode", curLangCode);
            setUILanguage(curLangCode);
        }
    }

    render() {
        return (
            <App />
        )
    }
}

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
      setUILanguage: (language) => dispatch({ type: 'SET_UI_LANGUAGE', language })
    };
  };

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(TranslationWrapper));

