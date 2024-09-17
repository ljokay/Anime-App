import React from 'react';
import './App.css';
import './background.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage'
import AnimeInfo from './Components/AnimeInfo';

const App = () => {
  return (
    <Router>
      
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>

       
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/anime/:id" element={<AnimeInfo />} />
          </Routes>
        
      
    </Router>
  );
};

export default App;
