import React from 'react';
import './App.css';
import './background.css';
import MainPage from './Pages/MainPage'
import AnimeInfo from './Components/AnimeInfo';
import Popular from './Pages/Popular'
import SearchPage from './Pages/Search';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
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
