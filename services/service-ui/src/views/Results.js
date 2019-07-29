import React from "react";
import NavigationBar from "../components/NavigiationBar/NavigationBar";
import ResultList from "../components/ResultList/ResultList";
import axios from "axios";
import WikiCard from "../components/WikiCard/WikiCard";
import { CircularProgress } from "@material-ui/core";
import "../assets/css/ResultsStyle.css";
import MemeTeam from '../components/MemeTeam/MemeTeam';
import NotFound from '../components/NotFound/NotFound';
import { connect } from 'react-redux';

/**
 * Results view class.
 * @param {object} props the given properties.
 * @returns {JSX} results view jsx components.
*/
class Results extends React.Component {

  state = {
    resultDocs: [],
    resultDocsLength: 0,
    error: false,
    wiki_url: "",
    wiki_title: "",
    wiki_summary: "",
    waiting: true,
    searchValue: this.props.location.state.searchValue,
    language: this.props.location.state.language,
    level: this.props.location.state.level,
    correct_spelled_query: ""
  };

  /**
   * call searchResults() after component did mount.
  */
  componentDidMount() {
    this.searchResults(this.state.searchValue, this.state.level, this.state.language)
  };

  /**
   * Loads the search results from API and stores to state.
   * @param {string} searchValue the user's search term.
   * @param {string} level the user's chosen language level.
   * @param {string} language the user's chosen language.
  */
  searchResults(searchValue, level, language) {
    // show CircularProgress when user starts new search
    this.setState({
      waiting: true
    });

    axios
      .get(`http://elaisa.org:8080/find`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        params: {
          query: searchValue.toLocaleLowerCase(),
          level: level,
          language: language,
          email: this.props.email,
          loggedin: this.props.loggedIn
        }
      })
      .then(response => {
        if (response.data.correct_query) {
          this.setState({
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
          let length = 0
          JSON.parse(response.data.documents).forEach(() => length++)

          this.setState({
            resultDocs: JSON.parse(response.data.documents),
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
        console.log("API Error: ", error)
        // handle error
        this.setState({
          resultDocs: [],
          resultDocsLength: 0,
          waiting: false,
          error: true,
          searchValue: searchValue,
          language: language,
          level: level
        });
      });
  }

  /**
   * Only render wiki card if there is a result.
   * @param {object} noWikiArticle if noWikiArticle is true, the wiki won't show up.
   * @returns {JSX} Progress bar or statistics components.
  */
  renderWiki(noWikiArticle) {
    if (!noWikiArticle) {
      return (
        <WikiCard
          url={this.state.wiki_url}
          title={this.state.wiki_title}
          summary={this.state.wiki_summary}
        />
      );
    }
  }

  /**
   * Repeats the search with correct searchValue if the user clicks the button on the NotFound view.
  */
  onClickSpellCheckForNewSearch() {
    this.searchResults(this.state.correct_spelled_query, this.state.level, this.state.language)
  }

  /**
   * Returns Results view if API request is finished.
   * @returns {JSX} Progress bar or statistics components.
  */
  renderResults() {
    // while service is fetching data, show the progress circle
    if (this.state.waiting) {
      return <div className="progress"><CircularProgress style={{ color: "grey" }} /></div>
    }
    // If search Value equals "memeteam" show team picture
    if (this.state.searchValue === "memeteam") {
      return <MemeTeam />;
    } else if (this.state.resultDocsLength !== 0) {
      // Otherwise show the results
      return (
        <div className="resultList">
          <ResultList
            searchValue={this.state.searchValue}
            resultDocsLength={this.state.resultDocsLength}
            resultDocs={this.state.resultDocs}
          />
          {this.renderWiki(this.state.wiki_title.length === 0)}
        </div>
      );
    } else {
      // Show the sad dog centered if there are no results
      return <NotFound searchValue={this.state.searchValue} language={this.state.language} level={this.state.level} correctSpelledQuery={this.state.correct_spelled_query} onClickSpellCheck={this.onClickSpellCheckForNewSearch.bind(this)} />
    }
  }

  /**
   * Renders JSX content.
   * @returns {JSX} Results.js.
  */
  render() {
    return (
      <div>
        <NavigationBar
          results
          click={this.searchResults.bind(this)}
          values={[
            this.state.searchValue,
            this.state.language,
            this.state.level,
            this.state.resultDocsLength
          ]}
          id="navBar"
        />
        {this.renderResults()}
      </div>
    );
  }
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
