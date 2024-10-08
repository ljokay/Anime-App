Better MAL App

This project was created using Create React App and managed with npm.

This projecct is hosted locally using a proxy server to handle CORS errors as the RESTful API used does not provide support.
To run properly, make sure to run "node proxy-server.js" before using "npm start".

This application is designed to showcase various data included within the API and display it to the user.
API auth key is contained within a .env file to help with security.
Screens are a collection of components and Screens are then added into the main App.js file and use a Router to link the pages.
Multiple API calls are used as different data is taken for different areas of the project.
If there are more than 10 results, the data is paged using a while loop to return more.
API calls are limited at 5,000 per day I believe.
API Documentation does contain call limits on other limits such as per minute/hour/etc. May come across errors if making a large amount of calls in a short amount of time.
I included certain restrictions/limitters in search criteria to suit my application's function.


More features and enhancements will be added in the future.

