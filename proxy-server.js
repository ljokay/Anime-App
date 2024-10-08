const express = require('express');
const corsAnywhere = require('cors-anywhere');

const app = express();
const port = process.env.PORT || 5000;

// Require the X-Requested-With header for better security
corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['X-Requested-With'],  // Require this header
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`);
});

// Optional: Add a route for the root URL for helpful information
app.get('/', (req, res) => {
    res.send('CORS Anywhere Proxy Server. Use the path /<url> to make requests.');
});