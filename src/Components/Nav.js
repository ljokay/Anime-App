import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div>
        <h1>BetterMAL</h1>
        </div>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/">User List</a></li>
        <li className="nav-item"><a href="/search">Find Something New!</a></li>
        <li className="nav-item"><a href="/popular">Top Series</a></li>
      </ul>
      <div className="information">
        <a href="https://www.linkedin.com/in/landen-bock-313972265" target="_blank"><img className="links" src="/Images/linked.png" alt="logo"></img></a>
        <a href="https://github.com/ljokay" target="_blank"><img className="links" src="/Images/git.png" alt="logo"></img></a>
        <img className="logo" src="/Images/lj.png" alt="logo"></img>
      </div>
    </nav>
  );
};

export default NavBar;