import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AnimeInfo = () => {
    const { id } = useParams(); // Get id from route parameters
    const [animeInfo, setAnimeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const page = `http://localhost:5000/https://api.myanimelist.net/v2/anime/${encodeURIComponent(id)}?fields=synopsis,rank,rating,genres, 
                studios, popularity, start_date, end_date, mean, num_scoring_users, studios`;
                const response = await fetch(page, {
                    headers: {
                        'X-MAL-CLIENT-ID': '3170c64ae604c7ea48742c9ef2b0a262',
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                // Check the structure of the response
                console.log(result); // Add this line to debug

                setAnimeInfo(result); // Directly set the fetched anime info
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAnimeDetails();
        }
    }, [id]);

    const getScoreColor = (score) => {
        if (score < 4 || score === "r" || score === "r+") {
            return 'score-low';
        }
        if (score > 4 && score < 7) {
            return 'score-medium';
        }
        if (score > 7 || score === "pg_13" || score =="pg") {
            return 'score-high'
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="centered">
            <div className="title-con border-color" >
            <h1 className="title">{animeInfo.title}</h1>
            </div>
            <div className={"info-main"}>
            <div className="side-info">
                <div className='user-ratings border-color'>
                        <h2>User Ratings</h2>
                        <p className={getScoreColor(animeInfo.mean)}>Average Score: {animeInfo.mean}</p>
                        <p>Overall Rank: {animeInfo.rank.toLocaleString()}</p>
                        <p>Popularity: {animeInfo.popularity.toLocaleString()}</p>
                        <p>Scored By: {animeInfo.num_scoring_users.toLocaleString()}</p>
                        <p className={`rating ${getScoreColor(animeInfo.rating)}`}>Rated: {animeInfo.rating.toUpperCase()}</p>
                </div>
                <div className="genre-con border-color">
                <h2>Genres</h2>
                <ul className="genres">
                    {animeInfo.genres.map((genre) => (
                        <li className='genre-li'><b>{genre.name}</b></li>
                    ))}
                </ul>
                </div>
            </div>
                <div className="info-pic-con border-color">
                    <img className="info-pic" src={animeInfo.main_picture.large} alt={animeInfo.title} />
                </div>
                <div className="syno border-color">
                    <h2>Synopsis</h2>
                    <p>{animeInfo.synopsis}</p>
                </div>
                
            </div>
            <div className="extra-info border-color">
                <h2>Production Information</h2>
                <p>Started Airing: {animeInfo.start_date}</p>
                <p>Stopped Airing: {animeInfo.end_date}</p>
                <p>Studio: {animeInfo.studios[0].name}</p>
                </div>
        </div>
    );
};

export default AnimeInfo;