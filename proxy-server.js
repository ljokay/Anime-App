const express = require('express');
const corsAnywhere = require('cors-anywhere');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all requests
corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['X-Requested-With'], // Require this header
    removeHeaders: ['cookie', 'cookie2'],
    setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // Allowed headers
    }
}).listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`);
});

// Optional: Add a route for the root URL for helpful information
app.get('/', (req, res) => {
    res.send('CORS Anywhere Proxy Server. Use the path /<url> to make requests.');
});