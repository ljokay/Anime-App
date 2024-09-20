// api/getAnimeList.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const nextPage = 'https://api.myanimelist.net/v2/users/LjOkay/animelist?status=completed&fields=list_status'; // Example URL

  try {
    const response = await fetch(nextPage, {
      headers: {
        'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID, // Use environment variable for security
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching data' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}