import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import ResultList from '../components/ResultList/ResultList';
import axios from 'axios';
import WikiCard from '../components/WikiCard/WikiCard';


class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: props.location.state.searchValue,
            language: props.location.state.language,
            level: props.location.state.level,
            resultDocs: [],
            resultDocsLength: 0,
            error: false,
            wiki_url: "",
            wiki_title: "",
            wiki_summary: ""
        }
        this.getResultDocs();
    }

    getResultDocs = () => {
        // source: https://github.com/axios/axios
        // IMPORTANT: install this on chrome: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related
        axios.get(`http://localhost:8080/find&query=${this.state.searchValue}`)
            .then((response) => {
                // handle success
                this.setState({
                    resultDocs: JSON.parse(response.data.documents),
                    resultDocsLength: JSON.parse(response.data.documents.length),
                    wiki_url: response.data.wikipedia.url,
                    wiki_title: response.data.wikipedia.title,
                    wiki_summary: response.data.wikipedia.summary
                })
            })
            .catch((error) =>{
                // handle error
                this.setState({error: true})
            })
    }

    // Only render wiki card if there is a result 
    renderWiki(error){
        if (!error){
            return <WikiCard url={this.state.wiki_url} title={this.state.wiki_title} summary={this.state.wiki_summary} />
        }
    }

    render() {
        return (
            <div>
                <NavigationBar results values={[this.state.searchValue, this.state.language, this.state.level, this.state.resultDocsLength]} />
                <div style={{display: "flex"}}>
                    <ResultList resultDocsLength={this.state.resultDocsLength} error={this.state.error} resultDocs={this.state.resultDocs}/>
                    {this.renderWiki(this.state.error)}
                </div>
            </div>
        );
    }
}

export default Results;