const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/https://api.myanimelist.net/v2/users/:username/animelist', async (req, res) => {
    const { username } = req.params;
    const clientId = process.env.REACT_APP_MAL_CLIENT_ID; // Ensure you have this in your environment variables

    try {
        const response = await fetch(`https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&fields=list_status`, {
            headers: {
                'X-MAL-CLIENT-ID': clientId,
            },
        });

        if (!response.ok) {
            return res.status(response.status).send('Error fetching data');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});