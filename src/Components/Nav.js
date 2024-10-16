import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div>
          <h1>BetterMAL</h1>
        </div>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">User List</Link>
        </li>
        <li className="nav-item">
          <Link to="/search">Find Something New!</Link>
        </li>
        <li className="nav-item">
          <Link to="/popular">Top Series</Link>
        </li>
      </ul>
      <div className="information">
        <a href="https://www.linkedin.com/in/landen-bock-313972265" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/Images/linked.png" alt="LinkedIn logo" />
        </a>
        <a href="https://github.com/ljokay" target="_blank" rel="noopener noreferrer">
          <img className="links" src="/Images/logo512.png" alt="GitHub logo" />
        </a>
        <img className="logo" src="/Images/lj.png" alt="logo" />
      </div>
    </nav>
  );
};

export default NavBar;