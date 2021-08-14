//Install express server
const express = require('express');
const path = require('path');
const process = require('process');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

console.log(process.env.PORT);
console.log(process.env.apiUrl);
console.log(process.env.accessToken);
