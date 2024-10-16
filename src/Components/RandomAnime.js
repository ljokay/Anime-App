import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const RandomAnime = () => {
    const navigate = useNavigate();
    const [operation, setOperation] = useState("random");
    const [animeList, setAnimeList] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);
    const [animeName, setName] = useState('');
    const [retryCount, setRetryCount] = useState(0);
    const clientId = process.env.REACT_APP_MAL_CLIENT_ID;

    const fetchRandomAnime = async () => {
        setAnimeList([]);
        if (retryCount > 5) {
            console.log('Maximum retry count reached.');
            return;
        }

        const url = `http://localhost:8080/https://api.myanimelist.net/v2/anime/${encodeURIComponent(randomNumber)}?fields=nsfw`;

        try {
            const response = await fetch(url, {
                headers: {
                    'X-MAL-CLIENT-ID': clientId,
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    generateRandomNumber();
                    return;
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            }

            const result = await response.json();
            console.log('Result:', result);

            // Check if the content is NSFW
            if (result.nsfw !== "white") {
                console.log("Contains NSFW Content");
                generateRandomNumber();
                setRetryCount(retryCount + 1);
                return;
            }

            // Set anime list with the result
            setAnimeList([result]);
            setRetryCount(0); // Reset retry count after successful fetch

        } catch (error) {
            console.error(error);
        }
    }

    const fetchSearchAnime = async () => {
        setAnimeList([]);
        let allAnime = [];
        let nextPage = `http://localhost:8080/https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(animeName)}&fields=nsfw`;
        const maxPages = 5; // Set a maximum number of pages to fetch
        let pageCount = 0;
    
        while (nextPage && pageCount < maxPages) {
            console.log('Fetching:', nextPage);
    
            try {
                const response = await fetch(nextPage, {
                    headers: {
                        'X-MAL-CLIENT-ID': '3170c64ae604c7ea48742c9ef2b0a262',
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const result = await response.json();
                console.log('Result:', result);
    
                allAnime = [...allAnime, ...result.data];
                nextPage = result.paging?.next ? `http://localhost:8080/${result.paging.next}` : null;
                console.log('Next Page:', nextPage);
    
                pageCount++;
            } catch (error) {
                console.error(error);
                break; // Stop fetching if there's an error
            }
        }

        // Format results for display
        const formattedResults = allAnime.map(item => item.node);
        setAnimeList(formattedResults);
    }

    const generateRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * 70000) + 1;
        setRandomNumber(randomNum);
    }

    const handleClick = () => {
        setOperation("random");
        generateRandomNumber();
    };

    useEffect(() => {
        if (operation === "random" && randomNumber !== 0) {
            fetchRandomAnime(); // Fetch anime only after randomNumber is updated
        }
    }, [randomNumber, operation]);


    const handleSearch = () => {
        if (animeName.trim()) {
            setOperation("search");
            fetchSearchAnime();
        }
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && animeName.trim() !== '') {
            
            try {
                await fetchSearchAnime();
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div>
            <div className="textoptions">
                <input
                    className="textbox"
                    type="text"
                    value={animeName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Anime Name'
                    onKeyDown={handleKeyPress}
                />
                <button className="btn" onClick={handleSearch}>Search</button>
                <button className="btn" onClick={handleClick}>Click For Something New!</button>
            </div>
            <div className="largeCon">
            <div className="grid-container">
                {animeList.map((anime) => (
                    <div key={anime.id} className="grid-item" onClick={() => navigate(`/anime/${encodeURIComponent(anime.id)}`)}>
                        {operation === "search" && <div className="node"></div>} {/* Conditionally display node for search */}
                        <div className="title-section">
                            <h2 className='large-title'>{anime.title}</h2>
                        </div>
                        <div className="content">
                            <div className="info"></div>
                            <div className="imgCon">
                                <img src={anime.main_picture.medium} alt={anime.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default RandomAnime;