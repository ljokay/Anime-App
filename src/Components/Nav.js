import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>BetterMAL</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/main">User List</a></li>
        <li className="nav-item"><a href="/search">Find Something New!</a></li>
        <li className="nav-item"><a href="/"></a></li>
      </ul>
    </nav>
  );
};

export default NavBar;