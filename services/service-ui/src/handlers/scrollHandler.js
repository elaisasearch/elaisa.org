import { scroller } from 'react-scroll';
import * as Scroll from 'react-scroll'
import ReactDom from 'react-dom';

let scroll = Scroll.animateScroll;
let Events = Scroll.Events;

/**
 * Scroll to the footer and display it. At the beginning the footer is hidden.
 * @param {DOM} element the container element
 */
export default function scrollToFooter(element) {

    /*
    Register the scroll event and handle displaying the footer
    */
    Events.scrollEvent.register('begin', (to, el) => {
        // Set the applications height to 320vh (three times screen size) to have enough space for the footer
        ReactDom.findDOMNode(el).parentElement.parentElement.style.minHeight = '320vh';
        // Display the footer
        ReactDom.findDOMNode(el).parentElement.style.display = 'flex';  

        // animate the content of <div> container element
        let firstChild = ReactDom.findDOMNode(el.firstChild);
        firstChild.classList.add('animate-element');
    });

    scroller.scrollTo(element, {
        duration: 1300,
        delay: 0,
        smooth: 'easeInOutQuart'
    })
};

export function scrollToTop() {
    scroll.scrollToTop();
}