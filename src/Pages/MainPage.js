import React from "react";
import NavBar from '../Components/Nav';
import Compare from '../Components/Compare';

const MainPage = () => {
    return (
      <div>
        <NavBar /> {/* Include ComponentA */}
        <Compare /> {/* Include ComponentB */}
      </div>
    );
};

export default MainPage;