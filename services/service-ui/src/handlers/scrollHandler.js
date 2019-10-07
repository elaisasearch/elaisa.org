import { scroller } from 'react-scroll';
import * as Scroll from 'react-scroll'
import ReactDom from 'react-dom';

let Events = Scroll.Events;

/**
 * Scroll to the footer and display it. At the beginning the footer is hidden.
 * @param {DOM} element the container element
 */
export default function scrollToFooter() {

    /*
    Register the scroll event and handle displaying the footer
    */
    Events.scrollEvent.register('begin', (to, el) => {
        // Display the footer
        ReactDom.findDOMNode(el).parentElement.style.display = 'flex';

        // animate the content of <div> container element
        let firstChild = ReactDom.findDOMNode(el.firstChild);
        firstChild.classList.add('animate-element');
    });

    scroller.scrollTo('content1', {
        duration: 1300,
        delay: 0,
        smooth: 'easeInOutQuart'
    })
};

export function scrollToFooterContent2() {

    /*
   Register the scroll event and handle displaying the footer
   */
    Events.scrollEvent.register('begin', (to, el) => {

        // Set the footers height to 220vh to have enough space for the footer
       ReactDom.findDOMNode(el).parentElement.style.height = '220vh';

        // Display content2 div
        ReactDom.findDOMNode(el).style.display = 'inherit';

        // animate the content of <div> container element
        let firstChild = ReactDom.findDOMNode(el.firstChild);
        firstChild.classList.add('animate-element');
    });

    scroller.scrollTo('content2', {
        duration: 1300,
        delay: 0,
        smooth: 'easeInOutQuart'
    })
}