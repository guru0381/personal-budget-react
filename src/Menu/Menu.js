import React from "react";
import {
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <div className="menu"
        role="Navigation"
        aria-label="Main menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement">
        <ul>
        <li><Link to="/">Homepage</Link></li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login" role="link" aria-label="LoginPage">Login</Link>
          </li>
          <li>
            <Link to="https://google.com" role="link" aria-label="Google"
            >Google</Link>
          </li>
            <li className="bar">

                
                <div id="percent-loaded"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100">
                <label htmlFor="Personal-Budget Management">Your progress:</label>
                <progress id="file" value="32" max="100"> 32% </progress>
            </div></li>
        </ul>
    </div>
  );
}

export default Menu;
