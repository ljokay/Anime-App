const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.use((req, res) => {
    const url = req.url.substring(1); // Remove the leading '/'
    req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`CORS Proxy server running on port ${PORT}`);
});