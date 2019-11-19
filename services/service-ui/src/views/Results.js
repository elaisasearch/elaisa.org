import React from "react";
import NavigationBar from "../components/NavigationBar";
import ResultList from "../components/ResultList/ResultList";
import axios from "axios";
import WikiCard from "../components/WikiCard/WikiCard";
import { Divider, Grid } from "@material-ui/core";
import NotFound from '../components/NotFound';
import { connect } from 'react-redux';
import HeaderTags from '../components/HeaderTags';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import globals from '../globals.json';
import ShareResultsButton from '../components/ShareResultsButton';

const useStyles = makeStyles({
  resultsRoot: {
    height: '100vh'
  }
});

/**
 * Results view class.
 * @param {object} props the given properties.
 * @returns {JSX} results view jsx components.
*/
const Results = (props) => {

  const classes = useStyles();

  // Read parameters from link to provide sharing results.
  const params = new URLSearchParams(props.location.search);
  const searchValue = params.get('query');
  const language = params.get('language');
  const level = params.get('level');

  const { email, loggedIn } = props; //redux

  const [state, setState] = React.useState({
    resultDocs: [],
    resultDocsLength: 0,
    wiki_url: "",
    wiki_title: "",
    wiki_summary: "",
    waiting: true,
    searchValue: searchValue,
    language: language,
    level: level,
    correct_spelled_query: ""
  });

  /**
   * call searchResults() after component did mount.
  */
  React.useEffect(() => {
    searchResults(state.searchValue, state.level, state.language)
  }, []);

  /**
   * Loads the search results from API and stores to state.
   * @param {string} searchValue the user's search term.
   * @param {string} level the user's chosen language level.
   * @param {string} language the user's chosen language.
  */
  const searchResults = (searchValue, level, language) => {
    // show CircularProgress when user starts new search
    setState({
      waiting: true
    });

    axios
      .get(`https://api.elaisa.org/find`, {
        params: {
          query: searchValue,
          level: level,
          language: language,
          email: email,
          loggedin: loggedIn,
          key: globals['api']['x-api-key']
        }
      })
      .then(response => {
        if (response.data.correct_query) {
          setState({
            resultDocs: [],
            resultDocsLength: 0,
            waiting: false,
            error: true,
            searchValue: searchValue,
            language: language,
            level: level,
            correct_spelled_query: response.data.correct_query
          });
        } else if (response.data.documents) {
          // get the length of result docs
          let length = response.data.documents.length

          setState({
            resultDocs: response.data.documents.results,
            resultDocsLength: length,
            wiki_url: response.data.wikipedia.url,
            wiki_title: response.data.wikipedia.title,
            wiki_summary: response.data.wikipedia.summary,
            waiting: false,
            error: false,
            searchValue: searchValue,
            language: language,
            level: level,
            correct_spelled_query: ""
          });
        }

      })
      .catch(error => {
        console.error("API Error: ", error)
        // handle error
        setState({
          resultDocs: [],
          resultDocsLength: 0,
          waiting: false,
          searchValue: searchValue,
          language: language,
          level: level,
          correct_spelled_query: ""
        });
      });
  }

  /**
   * Only render wiki card if there is a result.
   * @param {object} noWikiArticle if noWikiArticle is true, the wiki won't show up.
   * @returns {JSX} Progress bar or statistics components.
  */
  const renderWiki = (noWikiArticle) => {
    if (!noWikiArticle) {
      return (
        <WikiCard
          url={state.wiki_url}
          title={state.wiki_title}
          summary={state.wiki_summary}
        />
      );
    }
  }

  /**
   * Repeats the search with correct searchValue if the user clicks the button on the NotFound view.
  */
  const onClickSpellCheckForNewSearch = () => {
    searchResults(state.correct_spelled_query, state.level, state.language)
  }

  /**
   * Returns Results view if API request is finished.
   * @returns {JSX} Progress bar or statistics components.
  */
  const renderResults = () => {
    // while service is fetching data, show the progress circle
    if (state.waiting) {
      return <ResultList
        waiting={state.waiting}
        searchValue=''
        resultDocsLength={0}
        resultDocs={[]}
      />
    } else if (state.resultDocsLength !== 0) {
      // Otherwise show the results
      return (
        <Grid
          container
          direction={isMobile ? 'column-reverse' : 'row'}
          alignItems={isMobile ? 'center' : 'stretch'}
          wrap='nowrap'
        >
          <ResultList
            waiting={state.waiting}
            searchValue={state.searchValue}
            resultDocsLength={state.resultDocsLength}
            resultDocs={state.resultDocs}
          />
          {renderWiki(state.wiki_title.length === 0)}
        </Grid>
      );
    } else if (state.resultDocsLength === 0) {
      // Show the sad dog centered if there are no results
      return <NotFound searchValue={state.searchValue} language={state.language} level={state.level} correctSpelledQuery={state.correct_spelled_query} onClickSpellCheck={onClickSpellCheckForNewSearch.bind(this)} />
    }
  }

  /**
   * Renders JSX content.
   * @returns {JSX} Results.js.
  */

  return (
    <div className={classes.resultsRoot}>
      <HeaderTags
        title="Elaisa Search Engine - Results"
        desc={`See the results of your search about ${state.searchValue}. Take a look on the language analysis and visit the page.`}
        keywords="Results, Analysis"
      />
      <NavigationBar
        results
        click={searchResults.bind(this)}
        values={[
          state.searchValue,
          state.language,
          state.level,
          state.resultDocsLength
        ]}
        id="navBar"
      />
      {isMobile ? null : <Divider />}
      {renderResults()}
      {state.waiting ? null : <ShareResultsButton searchValue={searchValue} />}
    </div>
  );
}


/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} the props containing the redux state.
*/
const mapStateToProps = state => {
  return {
    email: state.email,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Results);
