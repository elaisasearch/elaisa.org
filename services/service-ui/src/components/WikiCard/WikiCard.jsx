import React from 'react';
import WikiCardTemplate from './WikiCardTemplate';

/**
 * The Wikipedia Card component.
 * @param {object} props the given properties.
 * @returns {JSX} Wikipedia Card Template component.
*/
const WikiCard = (props) => {

    return (
        <WikiCardTemplate url={props.url} title={props.title} summary={props.summary}/>
    );

};

export default WikiCard;


