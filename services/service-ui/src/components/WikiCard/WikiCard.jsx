import React from 'react';
import WikiCardTemplate from './WikiCardTemplate';

const WikiCard = (props) => {

    return (
        <WikiCardTemplate url={props.url} title={props.title} summary={props.summary}/>
    );

};

export default WikiCard;


