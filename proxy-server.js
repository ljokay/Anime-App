const express = require('express');
const corsAnywhere = require('cors-anywhere');

const app = express();
const port = 5000;

corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],  // Do not require specific headers
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`);
});