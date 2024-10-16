// Load the required packages
const corsAnywhere = require('cors-anywhere');

// Set up the server host and port
const host = '0.0.0.0'; // Listen on all interfaces
const port = 8080; // Change this to your desired port

// Create the CORS proxy server
corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere running on ${host}:${port}`);
});