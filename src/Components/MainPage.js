import React from "react";
import NavBar from './Nav';
import Compare from './Compare';

const MainPage = () => {
    return (
      <div>
        <NavBar /> {/* Include ComponentA */}
        <Compare /> {/* Include ComponentB */}
      </div>
    );
};

export default MainPage;