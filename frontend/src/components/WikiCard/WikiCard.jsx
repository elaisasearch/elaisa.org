import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import WikiCardTemplate from './WikiCardTemplate';

class WikiCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            url: "https://en.wikipedia.org/wiki/Beer",
            title: "Beer", 
            summary: "Beer is one of the oldest and most widely consumed alcoholic drinks in the world, and the third most popular drink overall after water and tea. Beer is brewed from cereal grains—most commonly from malted barley, though wheat, maize (corn), and rice are also used. During the brewing process, fermentation of the starch sugars in the wort produces ethanol and carbonation in the resulting beer. Most modern beer is brewed with hops, which add bitterness and other flavours and act as a natural preservative and stabilizing agent. Other flavouring agents such as gruit, herbs, or fruits may be included or used instead of hops. In commercial brewing, the natural carbonation effect is often removed during processing and replaced with forced carbonation.Some of humanity's earliest known writings refer to the production and distribution of beer: the Code of Hammurabi included laws regulating beer and beer parlours, and \"The Hymn to Ninkasi\", a prayer to the Mesopotamian goddess of beer, served as both a prayer and as a method of remembering the recipe for beer in a culture with few literate people.Beer is distributed in bottles and cans and is also commonly available on draught, particularly in pubs and bars. The brewing industry is a global business, consisting of several dominant multinational companies and many thousands of smaller producers ranging from brewpubs to regional breweries. The strength of modern beer is usually around 4% to 6% alcohol by volume (ABV), although it may vary between 0.5% and 20%, with some breweries creating examples of 40% ABV and above.Beer forms part of the culture of many nations and is associated with social traditions such as beer festivals, as well as a rich pub culture involving activities like pub crawling and pub games."
        }
        this.getWikiInfoForSearchValue()
    }

    getWikiInfoForSearchValue = () => {
        axios.get(`http://localhost:8080/wiki&term=${this.state.searchValue}&language=${this.state.language}`)
        .then((response) => {
            // handle success
            this.setState({
                //wikiEntry: response.data,
            })
            console.log(response)
        })
        .catch((error) =>{
            // handle error
            this.setState({error: true})
            console.log(error)
        })
        .then(() =>{
            // always executed
        });
    }

    render() {
        return (
            <WikiCardTemplate url={this.state.url} title={this.state.title} summary={this.state.summary}/>
        );
    }

};

export default WikiCard;


