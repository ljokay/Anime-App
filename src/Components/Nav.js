import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>BetterMAL</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/"></a></li>
        <li className="nav-item"><a href="/about"></a></li>
        <li className="nav-item"><a href="/services"></a></li>
      </ul>
    </nav>
  );
};

export default NavBar;