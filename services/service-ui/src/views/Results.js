import React from "react";
import NavigationBar from "../components/NavigiationBar/NavigationBar";
import ResultList from "../components/ResultList/ResultList";
import axios from "axios";
import WikiCard from "../components/WikiCard/WikiCard";
import { CircularProgress } from "@material-ui/core";
import  "../assets/css/ResultsStyle.css";
import MemeTeam from '../components/MemeTeam/MemeTeam';
import NotFound from '../components/NotFound/NotFound';
import { connect } from 'react-redux';

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
    level: this.props.location.state.level
  };

  componentDidMount() {
    this.searchResults(this.state.searchValue, this.state.level, this.state.language)
  };

  searchResults(searchValue, level, language) {
    // show CircularProgress when user starts new search
    this.setState({
      waiting: true
    });
    
    axios
    .get(`http://localhost:8080/find`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      params: {
        query: searchValue,
        level: level,
        language: language,
        email: this.props.email,
        loggedin: this.props.loggedIn
      }
    })
    .then(response => {
      // handle success

      // get the length of result docs
      let length = 0
      for (let d in JSON.parse(response.data.documents)) {
        length++;
      }

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
        level: level
      });
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

  // Only render wiki card if there is a result
  renderWiki(error) {
    if (!error) {
      return (
        <WikiCard
          url={this.state.wiki_url}
          title={this.state.wiki_title}
          summary={this.state.wiki_summary}
        />
      );
    }
  }

  renderResults() {
    // while service is fetching data, show the progress circle
    if (this.state.waiting) {
       return <div className="progress"><CircularProgress style={{color: "grey"}}/></div>
    }
    // If search Value equals "memeteam" show team picture
    if (this.state.searchValue === "memeteam") {
      return  <MemeTeam />;
    } else if (this.state.resultDocsLength !== 0) {
      // Otherwise show the results
      return (
        <div style={{ display: "flex" }}>
          <ResultList
            searchValue={this.state.searchValue}
            resultDocsLength={this.state.resultDocsLength}
            resultDocs={this.state.resultDocs}
          />
          {this.renderWiki(this.state.error)}
        </div>
      );
    } else {
      // Show the sad dog centered if there are no results
      return <NotFound searchValue={this.state.searchValue} language={this.state.language} level={this.state.level} />
    }
  }

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

const mapStateToProps = state => {
  return {
    email: state.email,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Results);
