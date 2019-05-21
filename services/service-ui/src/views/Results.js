import React from "react";
import NavigationBar from "../components/NavigiationBar/NavigationBar";
import ResultList from "../components/ResultList/ResultList";
import axios from "axios";
import WikiCard from "../components/WikiCard/WikiCard";
import memeteam from "../assets/img/memeteam.png";
import { Typography, CircularProgress } from "@material-ui/core";
import errorPic from "../assets/img/error.png";
import styles from "../assets/jss/ResultsStyle";

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
    .get(`http://localhost:8080/find&query=${searchValue}&level=${level}&language=${language}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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
       return <div style={styles.progress}><CircularProgress style={{color: "grey"}}/></div>
    }
    // If search Value equals "memeteam" show team picture
    if (this.state.searchValue === "memeteam") {
      return (
        <div style={styles.polaroid}>
          <a
            href="https://github.com/dasmemeteam/language-level-search-engine"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={memeteam} alt="MemeTeam" style={styles.polaroidImage} />
          </a>
          <div style={styles.polaroidText}>
            <p>Jenny, Paula, Alex</p>
            <p>
              <b>The MemeTeam</b>
            </p>
          </div>
        </div>
      );
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
      return (
        <div style={styles.sadDog}>
          <img src={errorPic} alt="Error" style={{ width: "20%" }} />
          <Typography variant="h6">
            Sorry, there are no results for "<b>{this.state.searchValue}</b>" 😔.
            Please try again 🧐.
          </Typography>
          <Typography variant="caption">
            Try to choose another language level than <b>{this.level}</b>
          </Typography>
        </div>
      );
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

export default Results;
