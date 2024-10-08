import React from 'react';
import './App.css';
import './background.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage'
import AnimeInfo from './Components/AnimeInfo';
import Popular from './Pages/Popular'
import SearchPage from './Pages/Search';

const App = () => {
  return (
    <Router basename="/Anime-App">
      
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>

       
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/anime/:id" element={<AnimeInfo />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/popular" element={<Popular />} />
          </Routes>
        
      
    </Router>
  );
};

export default App;
