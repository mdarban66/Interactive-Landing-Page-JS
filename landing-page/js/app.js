/* eslint-disable space-before-blocks */
/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable camelcase */
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let li_text = '';
let ul_text = '';
let active_class = null;
let prevActive = '';
let target = '';
let actNav = '';


/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * @description Changes the class of active section to your-active-class when scrolled
 * @param Each item acts as a section
 */
function activeSec(item) {
    active_class = document.querySelector('.your-active-class');

    if (active_class != null && item.parentElement !== prevActive) {
        active_class.classList.remove('your-active-class');
        active_class.removeAttribute('style');
    }

    item.parentElement.classList.add('your-active-class');
    prevActive = document.querySelector('.your-active-class');
    // if (parent.classList.contains('your-active-class')) {
    //     parent.setAttribute('style', 'background-color:gray;border:1px solid black;border-radius:15px;box-shadow: 3px 5px 0px 0px darkgray;');
    // }
}

/**
 * @description Highlights the menu item that corresponds to the scrolled section in the page
 * @param {*} target The <a> link that corresponds to the scrolled section
 */
function highlightNav(target) {
    actNav = document.querySelector('.active_nav');
    if (actNav != null) {
        actNav.classList.remove('active_nav');
    }
    target.classList.add('active_nav');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * @description The required tasks (including building nav, scrolling to active section, calculating performance,...) starts to run
 */

const initial = performance.now();

// build the nav

const nav = document.querySelectorAll('.landing__container');

/**
 * @description Loads navigation bar
 * @returns a navigation bar after the page title
 */
function navLoad() {
    for (let i = 0; i < nav.length; i++) {
        let item = nav[i];
        let temp = item.querySelector('h2').textContent;
        li_text = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', '#' + item.parentElement.id);
        link.setAttribute('class', 'nav_link');
        link.textContent = temp;
        ul_text = document.querySelector('#navbar__list');
        li_text.appendChild(link);
        ul_text.appendChild(li_text);
        // nav_counter += 1
        // eslint-disable-next-line spaced-comment
        /*if (nav_counter < 2000 & nav_counter <= i + 1) {
            setTimeout(pageLoad, 0);
        }*/
    }
}

/**/

// Add class 'active' to section when near top of viewport
//debugger;
const landing_container = document.querySelectorAll('.landing__container');

// Scroll to anchor ID using scrollTO event
const _link = document.querySelector('.navbar__menu');

/**
 * End Main Functions
 * Begin Events
 */

// Build menu
window.addEventListener('scroll', navLoad());

// Scroll to section on link click
/**
 * @description Selecting each item of the navigation list should scroll to the proper section
 */
_link.addEventListener('click', function(evt) {
    if (evt.target.nodeName === 'A') {
        target = evt.target;
        evt.preventDefault();
        const temp = target.href;
        const tempp = temp.indexOf('#');
        const temppp = temp.substring(tempp + 1);
        document.getElementById(temppp).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        highlightNav(target);
    }
});

// Set sections as active
window.addEventListener('scroll', function() {
    for (let item of landing_container) {
        if (item.getBoundingClientRect().top <= 150) {
            activeSec(item);
            console.log(item.parentElement.id);
            const aList = document.getElementsByTagName('A');
            for (const i of aList) {
                const x = (i.href);
                const y = x.indexOf('#');
                const hreff = x.substring(y + 1);
                if (hreff === item.parentElement.id) {
                    highlightNav(i);
                }
            }
        }

        // item.addEventListener('mouseover', activeSec.bind(null, { target: item }));
    }
});

const end = performance.now();
console.log('The code performance is:' + (end - initial) + 'milliseconds');