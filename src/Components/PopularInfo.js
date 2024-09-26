import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Popular = () => {
  const navigate = useNavigate();

  const [animeList, setAnimeList] = useState([]);
  const [selection, setSelection] = useState('all');
  const [isFetching, setIsFetching] = useState(false); // New state to prevent multiple fetches
  const clientId = process.env.REACT_APP_MAL_CLIENT_ID;

  const fetchTopAnime = async () => {
    let allAnime = [];
    const url = `http://localhost:5000/https://api.myanimelist.net/v2/anime/ranking?ranking_type=${selection}&limit=100&fields=synopsis,rank,rating,genres,studios,popularity,start_date,end_date,mean,num_scoring_users`;
    try {
      console.log('Starting fetch process');
      setIsFetching(true); // Set isFetching to true when starting the fetch process
    
        const response = await fetch(url, {
          headers: {
            'X-MAL-CLIENT-ID': clientId,
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Result:', result);

        allAnime = [...allAnime, ...result.data];

      console.log('Fetched all pages, setting anime list');
      setAnimeList(allAnime);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setIsFetching(false); // Set isFetching to false when fetch completes
    }
  };

  const handleSelectOptions = (event) => {
    const value = event.target.value;
    if (value !== selection) {
      setSelection(value);
    }
  };

  // Fetch data only when 'selection' changes and not when fetch is already ongoing
  useEffect(() => {
    if (!isFetching) {
      console.log('useEffect triggered, fetching anime');
      fetchTopAnime();
    }
  }, [selection]);

  return (
    <div>
      <div className="textoptions">
        <select className="textbox" id="options" name="options" onChange={handleSelectOptions}>
          <option value="all">Top Anime Series</option>
          <option value="airing">Top Airing Anime</option>
          <option value="upcoming">Top Upcoming Anime</option>
          <option value="bypopularity">Top Anime By Popularity</option>
        </select>
      </div>
      <div className="largeCon">
      <div className="grid-container">
        {animeList.map((anime) => (
          <div key={anime.node.id} className="grid-item" onClick={() => navigate(`/anime/${encodeURIComponent(anime.node.id)}`)}>
            <div className="title-section">
              <h2 className='large-title'>{anime.node.title}</h2>
            </div>
            <div className="content">
              <div className="info"></div>
              <div className="imgCon">
                <img src={anime.node.main_picture.medium} alt={anime.node.title} />
              </div>
              <div className="info">
                <p>Overall Rank: #{anime.node.rank}</p>
                <p>Popularity: #{anime.node.popularity.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Popular;