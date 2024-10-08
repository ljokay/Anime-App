import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Compare = () => {
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('LjOkay');
    const [sort, setSort] = useState('');
    const clientId = process.env.REACT_APP_MAL_CLIENT_ID;

    useEffect(() => {
        if (username.trim() !== '') {
            fetchMAL(username);
        }
    }, [username]);

    const fetchMAL = async (username) => {
        try {
            let allAnime = [];
            let nextPage = `https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&fields=list_status`;

            while (nextPage) {
                console.log('Fetching:', nextPage);

                const response = await fetch(nextPage, {
                    headers: {
                        'Origin': 'https://ljokay.github.io',
                        'X-MAL-CLIENT-ID': clientId,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                console.log('Result:', result);

                allAnime = [...allAnime, ...result.data];
                nextPage = result.paging?.next ? `https://cors-anywhere.herokuapp.com/${result.paging.next}` : null;

                console.log('Next Page:', nextPage);
            }

            // Sort data based on the selected sort option
            if (sort) {
                allAnime.sort((a, b) => {
                    switch (sort) {
                        case "Alphabetically Ascending":
                            return a.node.title.localeCompare(b.node.title);
                        case "Alphabetically Descending":
                            return b.node.title.localeCompare(a.node.title);
                        case "Personal Score":
                            return a.list_status.score - b.list_status.score;
                        case "Personal Score Descending":
                            return b.list_status.score - a.list_status.score;
                        case "Overall Rank":
                            return (a.list_status.rank || Infinity) - (b.list_status.rank || Infinity);
                        default:
                            return 0;
                    }
                });
            }

            setAnimeList(allAnime);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && username.trim() !== '') {
            setLoading(true);
            try {
                await fetchMAL(username);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleSortOptions = (event) => {
        const value = event.target.value;
        setSort(value);
        console.log('New Sort Value:', value);

        // Sort locally after setting the new sort option
        if (animeList.length > 0) {
            setAnimeList(prevList => {
                return [...prevList].sort((a, b) => {
                    switch (value) {
                        case "Alphabetically Ascending":
                            return a.node.title.localeCompare(b.node.title);
                        case "Alphabetically Descending":
                            return b.node.title.localeCompare(a.node.title);
                        case "Personal Score":
                            return a.list_status.score - b.list_status.score;
                        case "Personal Score Descending":
                            return b.list_status.score - a.list_status.score;
                        case "Overall Rank":
                            return (a.list_status.rank || Infinity) - (b.list_status.rank || Infinity);
                        default:
                            return 0;
                    }
                });
            });
        } else {
            fetchMAL(username); // Re-fetch if list is empty
        }
    };

    const showExtraInfo = (title) => {
        navigate(`/anime/${encodeURIComponent(title)}`);
    }

    return (
        <div>
            <div className="textoptions">
            <label><b>Account Name:</b></label>
            <input
                className="textbox"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Enter Username'
            />

            <label htmlFor="options"><b>Sort By:</b></label>
            <select className="textbox" id="options" name="options" onChange={handleSortOptions}>
                <option value="">Select an option</option>
                <option value="Personal Score">Personal Score</option>
                <option value="Personal Score Descending">Personal Score Desc</option>
                <option value="Overall Rank">Overall Rank</option>
                <option value="Alphabetically Ascending">Alphabetically Ascending</option>
                <option value="Alphabetically Descending">Alphabetically Descending</option>
            </select>
            {loading && <p>Loading...</p>}
            </div>
            <div className="largeCon">
            <div className="grid-container">
                {animeList.map((anime) => (
                    <div key={anime.node.id} className="grid-item"
                    onClick={() => showExtraInfo(anime.node.id)}>
                        <div className="title-section">
                            <h2 className='large-title'>{anime.node.title}</h2>
                        </div>
                        <div className="content">
                        <div className="info">
                            <p><b>Score</b></p>
                            <p>{anime.list_status.score}/10</p>
                            <p><b>Episodes Watched</b></p>
                            <p>{anime.list_status.num_episodes_watched}</p>
                            <p><b>Last Updated At:</b> </p>
                            <p>{moment(anime.list_status.updated_at).format('YYYY-MM-DD')}</p>
                        </div>
                        <div className="imgCon">
                        <img src={anime.node.main_picture.medium} alt={anime.node.title} />
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Compare;