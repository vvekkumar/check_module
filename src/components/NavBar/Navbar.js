import React from 'react';
import './Navbar.css';

const Navbar = () => {
   const nav = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }

    const logout = () => {
      localStorage.removeItem('user');
    }

    return(
        <div className="topnav" id="myTopnav">
         <a href="/dashboard">dashboard</a>
        <a  href="/payment">payment</a>
        <a href="/organization">organization</a>
        <a className="logout" onClick={logout}>logout</a>
        <a className="icon" onClick={nav}>
          <i className="fa fa-bars"></i>
        </a>
        </div>
    )
}

export default Navbar;