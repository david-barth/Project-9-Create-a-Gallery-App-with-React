//Project 9: Nav Component


import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav(props) {
    return (
    <nav className="main-nav">
        <ul>
          <li><NavLink exact to='/'>{props.categories[0]}</NavLink></li>
          <li><NavLink to='/category1'>{props.categories[1]}</NavLink></li>
          <li><NavLink to='/category2'>{props.categories[2]}</NavLink></li>
        </ul>
    </nav>
    )
}

export default Nav;


/*Explanation: Each li element tab uses props to programmatically update the text content with the current photoTheme values.  
NavLink components are used for navigation/linking purposes within the app.  Route components match to the links here. */



//The links will stay constant using generalized category names. 

//The tabs and the results info are programmatically synched with the search tab event handling upon submission. 



